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
  userType: boolean;
  companyData?: object;
  legalAddress?: object;
}
export interface IUserResetPassDto {
  email: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const companyDataSchema = Joi.object({
  companyName: Joi.string().required(),
  inn: Joi.string().required(),
  kpp: Joi.string().required(),
  bank: Joi.string().required(),
  bankCity: Joi.string().required(),
  bik: Joi.string().required(),
  account: Joi.string().required(),
  corrAccount: Joi.string().required(),
  ogrn: Joi.string().required(),
  okpo: Joi.string().required(),
})

export const legalAddressSchema = Joi.object({
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
  region: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.string().required(),
  building: Joi.string().required(),
  appartment: Joi.string().required(),
})

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  patronimicName: Joi.string().optional(),
  phone: Joi.string(),
  region: Joi.string(),
  userType: Joi.boolean(),
  companyData: Joi.alternatives().conditional('userType', { is: true, then: companyDataSchema.required() }),
  legalAddress: Joi.alternatives().conditional('userType', { is: true, then: legalAddressSchema.required() }), 
});

export const resetPassSchema = Joi.object({
  email: Joi.string().email().required(),
});