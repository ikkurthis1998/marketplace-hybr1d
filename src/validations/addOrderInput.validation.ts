import Joi from 'joi';
import { IAddOrderInput } from '../controller/buyer.controller';

export const AddOrderInputSchema = Joi.object<IAddOrderInput>({
    products: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        quantity: Joi.number().strict().integer().min(1).required(),
    })).required()
});
