import Joi from 'joi';

export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface IUserSignupDto {
  email: string;
  firstName: string;
  lastName: string;
  patronimicName: string;
  phone: string;
  region?: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  patronimicName: Joi.string().optional(),
  phone: Joi.string().optional(),
  region: Joi.string().optional(),
});
