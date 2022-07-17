import Joi from 'joi';
import { IAddProductsInput } from '../controller/seller.controller';

export const AddProductsInputSchema = Joi.object<IAddProductsInput>({
    products: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        price: Joi.number().strict().required(),
    })).required()
});
