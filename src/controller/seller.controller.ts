import { UserType, Catalog } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../configs/prisma.config";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { ControllerLogger } from "../utils/decorator.util";
import { validate } from "../validations";
import { AddProductsInputSchema } from "../validations/addProductsInput.validation";

export interface IAddProductsInput {
    products: Array<{
        name: string;
        price: number;
    }>;
}

class SellerController {
    @ControllerLogger()
    async AddProducts(req: AuthenticatedRequest, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            const { user } = req;

            if (!user || user.type !== UserType.SELLER) {
                return {
                    status: "error",
                    statusCode: 401,
                    message: "Unauthorized",
                    data: null
                }
            }

            const {
                products
            } = req.body;

            const validation = validate({ products }, AddProductsInputSchema);

            if (validation.status !== "success") {
                return {
                    status: validation.status,
                    statusCode: validation.statusCode,
                    message: validation.message,
                    data: validation.data
                }
            }

            let catalog = await prisma.catalog.findFirst({
                where: {
                    userId: user?.id
                }
            });

            if (!catalog) {
                catalog = await prisma.catalog.create({
                    data: {
                        user: {
                            connect: {
                                id: user?.id
                            }
                        }
                    }
                });
            }

            if (catalog) {
                const productsToCreate = products.map((product: {
                    name: string;
                    price: number;
                }) => {
                    return {
                        name: product.name,
                        price: product.price,
                        catalogId: catalog?.id
                    }
                });

                const productsCreated = await prisma.product.createMany({
                    data: productsToCreate
                });

                return {
                    status: "success",
                    statusCode: 201,
                    message: "Products added successfully",
                    data: productsCreated
                }
            }

            return {
                status: 'error',
                statusCode: 400,
                message: 'Error fetching catalog',
                data: null
            }

        } catch (error: any) {
            return {
                status: error.status || 'error',
                statusCode: error.statusCode || 500,
                message: error.message || 'Internal server error',
                data: error.data || null
            }
        }
    }

    @ControllerLogger()
    async GetOrders(req: AuthenticatedRequest, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            const { user } = req;

            if (!user || user.type !== UserType.SELLER) {
                return {
                    status: "error",
                    statusCode: 401,
                    message: "Unauthorized",
                    data: null
                }
            }

            const catalog = await prisma.catalog.findFirst({
                where: {
                    userId: user?.id
                },
                include: {
                    orders: true
                }
            });

            return {
                status: 'success',
                statusCode: 200,
                message: 'Orders fetched successfully',
                data: catalog?.orders || []
            }

        } catch (error: any) {
            console.log(error);
            return {
                status: error.status || 'error',
                statusCode: error.statusCode || 500,
                message: error.message || 'Internal server error',
                data: error.data || null
            }
        }
    }
}

export const sellerController = new SellerController();
