import express from 'express';
import { userController } from '../controller/user.controller';

export const userRouter = express.Router();

userRouter.post("/register", userController.RegisterUser);

userRouter.post("/login", userController.LoginUser);
