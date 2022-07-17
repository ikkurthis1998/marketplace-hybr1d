import express from 'express';
import { sellerController } from '../controller/seller.controller';
import { authenticate } from '../middleware/auth.middleware';

export const sellerRouter = express.Router();

sellerRouter.post("/products", authenticate, sellerController.AddProducts);

sellerRouter.get("/orders", authenticate, sellerController.GetOrders);
