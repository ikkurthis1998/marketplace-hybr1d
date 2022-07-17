import { UserType } from '@prisma/client';
import Joi from 'joi';
import { IUserLoginInput } from '../controller/auth.controller';

export const UserLoginInputSchema = Joi.object<IUserLoginInput>({
    email: Joi.string().email(),
    phone: Joi.string(),
    password: Joi.string().required()
}).xor('email', 'phone');
