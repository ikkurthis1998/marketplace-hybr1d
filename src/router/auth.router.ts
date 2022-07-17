import express from 'express';
import { authController } from '../controller/auth.controller';

export const authRouter = express.Router();

authRouter.post("/register", authController.RegisterUser);

authRouter.post("/login", authController.LoginUser);
