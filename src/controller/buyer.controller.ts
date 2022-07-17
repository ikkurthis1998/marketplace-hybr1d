import { UserType } from "@prisma/client";
import { Response } from "express";
import { prisma } from "../configs/prisma.config";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { ControllerLogger } from "../utils/decorator.util";
import { validate } from "../validations";
import { AddOrderInputSchema } from "../validations/addOrderInput.validation";

export interface IAddOrderInput {
    products: Array<{
        id: string;
        quantity: number;
    }>;
}

class BuyerController {
    @ControllerLogger()
    async GetSellers(req: AuthenticatedRequest, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            const { user } = req;

            // TODO: Decide if we want to allow this endpoint to be accessed by sellers

            // if (!user || user.type !== UserType.BUYER) {
            //     return {
            //         status: "error",
            //         statusCode: 401,
            //         message: "Unauthorized",
            //         data: null
            //     }
            // }

            const sellers = await prisma.user.findMany({
                where: {
                    type: UserType.SELLER
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true
                }
            });

            return {
                status: "success",
                statusCode: 200,
                message: "Sellers retrieved successfully",
                data: sellers
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
    async GetSellerCatalog(req: AuthenticatedRequest, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            const { user } = req;

            // TODO: Decide if we want to allow this endpoint to be accessed by sellers

            // if (!user || user.type !== UserType.BUYER) {
            //     return {
            //         status: "error",
            //         statusCode: 401,
            //         message: "Unauthorized",
            //         data: null
            //     }
            // }

            const sellerId = req.params.sellerId;

            const seller = await prisma.user.findFirst({
                where: {
                    type: UserType.SELLER,
                    id: sellerId
                },
                include: {
                    catalog: {
                        include: {
                            products: true
                        }
                    }
                }
            });

            if (!seller) {
                return {
                    status: "error",
                    statusCode: 404,
                    message: "Seller not found",
                    data: null
                }
            }

            return {
                status: "success",
                statusCode: 200,
                message: "Sellers retrieved successfully",
                data: seller?.catalog?.products || []
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
    async AddOrder(req: AuthenticatedRequest, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            const { user } = req;

            // TODO: Decide if we want to allow this endpoint to be accessed by sellers

            // if (!user || user.type !== UserType.BUYER) {
            //     return {
            //         status: "error",
            //         statusCode: 401,
            //         message: "Unauthorized",
            //         data: null
            //     }
            // }

            const sellerId = req.params.sellerId;

            const {
                products
            }: IAddOrderInput = req.body;

            const validation = validate({ products }, AddOrderInputSchema);

            if (validation.status === "error") {
                return {
                    status: "error",
                    statusCode: 400,
                    message: validation.message,
                    data: null
                }
            }

            const seller = await prisma.user.findFirst({
                where: {
                    type: UserType.SELLER,
                    id: sellerId
                },
                include: {
                    catalog: {
                        include: {
                            products: true
                        }
                    }
                }
            });

            if (!seller) {
                return {
                    status: "error",
                    statusCode: 404,
                    message: "Seller not found",
                    data: null
                }
            }

            const sellerProducts = seller?.catalog?.products || [];

            let productsToAdd: {
                id: string;
                quantity: number;
                price?: number;
            }[] = products.filter(({ id }) => sellerProducts.find(({ id: sellerProductId }) => sellerProductId === id));

            if (productsToAdd.length < products.length) {
                return {
                    status: "error",
                    statusCode: 400,
                    message: "Some products were not found in the seller's catalog",
                    data: null
                }
            }

            productsToAdd = productsToAdd.map(({ id, quantity }) => ({
                id,
                quantity,
                price: sellerProducts.find(({ id: sellerProductId }) => sellerProductId === id)?.price || 0
            }));

            const order = await prisma.order.create({
                data: {
                    user: {
                        connect: {
                            id: user?.id
                        }
                    },
                    catalog: {
                        connect: {
                            id: seller?.catalog?.id
                        }
                    },
                    orderItems: {
                        create: productsToAdd.map(({ id, quantity }) => ({
                            product: {
                                connect: {
                                    id
                                }
                            },
                            quantity
                        }))
                    },
                    value: productsToAdd.reduce((acc, { price, quantity }) => acc + ((price || 0) * quantity), 0)
                },
                include: {
                    orderItems: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            return {
                status: "success",
                statusCode: 201,
                message: "Order created successfully",
                data: order
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

export const buyerController = new BuyerController();
