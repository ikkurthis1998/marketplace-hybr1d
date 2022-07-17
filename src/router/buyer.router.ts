import express from 'express';
import { buyerController } from '../controller/buyer.controller';
import { authenticate } from '../middleware/auth.middleware';

export const buyerRouter = express.Router();

buyerRouter.get("/sellers", authenticate, buyerController.GetSellers);

buyerRouter.get("/seller-catalog/:sellerId", authenticate, buyerController.GetSellerCatalog); 

buyerRouter.post("/add-order/:sellerId", authenticate, buyerController.AddOrder);
