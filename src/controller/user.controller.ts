import { User, UserType } from "@prisma/client";
import { Request, Response } from "express";
import { checkPasswordStrength } from "../utils/checkPasswordStrength.util";
import { validate } from "../validations";
import { UserRegisterInputSchema } from "../validations/userRegisterInput.validation";
import { prisma } from '../configs/prisma.config';
import { encryptData, decryptData } from "../utils/crypto.util";
import { ControllerLogger } from "../utils/decorator.util";
import { getAccessToken } from "../utils/jwt.util";

export interface IUserRegisterInput {
    firstName: string;
    lastName: string;
    type: UserType;
    email?: string;
    phone?: string;
    password: string;
}

class UserController {
    @ControllerLogger()
    async RegisterUser(req: Request, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            let {
                firstName,
                lastName,
                type,
                email,
                phone,
                password
            }: IUserRegisterInput = req.body;

            firstName = firstName.trim();
            lastName = lastName.trim();
            email = email ? email.trim().toLowerCase() : undefined;
            phone = phone ? phone.trim() : undefined;

            const validation = validate({ firstName, lastName, type, email, phone, password }, UserRegisterInputSchema);

            if (validation.status !== "success") {
                return {
                    status: validation.status,
                    statusCode: validation.statusCode,
                    message: validation.message,
                    data: validation.data
                }
            }

            const passwordStrengthCheck = checkPasswordStrength({ password });

            if (passwordStrengthCheck.status !== "success") {
                return {
                    status: passwordStrengthCheck.status,
                    statusCode: passwordStrengthCheck.statusCode,
                    message: passwordStrengthCheck.message,
                    data: passwordStrengthCheck.data
                }
            }

            let user: Partial<Pick<User, 'lock'>> & Omit<User, "lock"> | null = null;
            
            if (email) {
                user = await prisma.user.findFirst({
                    where: {
                        email
                    }
                })
            }
            
            if (phone) {
                user = await prisma.user.findFirst({
                    where: {
                        phone
                    }
                });
            }

            if (user) {
                return {
                    status: "error",
                    statusCode: 400,
                    message: "User already exists",
                    data: null
                }
            }

            const lock = encryptData({ data: `${firstName}${lastName}${email}${phone}`, password });
            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    type,
                    email,
                    phone,
                    lock
                }
            });

            delete user["lock"];

            const token = getAccessToken({ id: user.id });

            return {
                status: "success",
                statusCode: 201,
                message: "User registered successfully",
                data: {
                    user,
                    token
                }
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
    async LoginUser(req: Request, res: Response): Promise<{ status: any; statusCode: any; message: any; data: any; }> {
        try {

            const { email, phone, password } = req.body;

            const user: Partial<Pick<User, 'lock'>> & Omit<User, 'lock'> | null = email ? await prisma.user.findFirst({
                where: {
                    email
                }
            }) : await prisma.user.findFirst({
                where: {
                    phone
                }
            });

            if (!user) {
                return {
                    status: "error",
                    statusCode: 400,
                    message: "User not found",
                    data: null
                }
            }

            const lock = user.lock as string;

            const isValid = decryptData({ encryptedData: lock, password });

            if (!isValid) {
                return {
                    status: "error",
                    statusCode: 400,
                    message: "Invalid credentials",
                    data: null
                }
            }

            delete user["lock"];

            const token = getAccessToken({ id: user.id });

            return {
                status: "success",
                statusCode: 200,
                message: "User logged in successfully",
                data: {
                    user,
                    token
                }
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
}

export const userController = new UserController();
