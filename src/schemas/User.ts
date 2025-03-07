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
  inn: Joi.string().optional(),
  kpp: Joi.string().optional(),
  bank: Joi.string().optional(),
  bankCity: Joi.string().optional(),
  bik: Joi.string().optional(),
  account: Joi.string().optional(),
  corrAccount: Joi.string().optional(),
  ogrn: Joi.string().optional(),
  okpo: Joi.string().optional(),
})

export const legalAddressSchema = Joi.object({
  postalCode: Joi.string().required(),
  country: Joi.string().optional(),
  region: Joi.string().optional(),
  city: Joi.string().optional(),
  street: Joi.string().optional(),
  houseNumber: Joi.string().optional(),
  building: Joi.string().optional(),
  apartment: Joi.string().optional(),
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