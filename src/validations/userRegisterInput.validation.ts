import { UserType } from '@prisma/client';
import Joi, { object, string } from 'joi';
import { IUserRegisterInput } from '../controller/auth.controller';

export const UserRegisterInputSchema = Joi.object<IUserRegisterInput>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    type: Joi.string().valid(...Object.values(UserType)).required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    password: Joi.string().required()
}).or('email', 'phone');
