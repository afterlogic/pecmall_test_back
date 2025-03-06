import { FastifyReply, FastifyRequest } from 'fastify';
import db from '../models';
import { ERRORS, handleServerError } from '../helpers/errors.helper';
import * as JWT from 'jsonwebtoken';
import { STANDARD } from '../constants/request';
import { IUserLoginDto, IUserResetPassDto, IUserSignupDto } from '../schemas/User';
import generator  from 'generate-password';
import mailer from '../services/mailer';
import { Op } from '@sequelize/core';
const { User } = db;

export const login = async (
  request: FastifyRequest<{
    Body: IUserLoginDto;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return reply
        .code(ERRORS.userNotExists.statusCode)
        .send(ERRORS.userNotExists.message);
    }

    const checkPass = user.isPasswordMatch(password);
    if (!checkPass) {
      return reply
        .code(ERRORS.userCredError.statusCode)
        .send(ERRORS.userCredError.message);
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.APP_JWT_SECRET as string,
    );

    return reply.code(STANDARD.OK.statusCode).send({
      token,
    });
  } catch (err) {
    return handleServerError(reply, err);
  }
};

export const signUp = async (
  request: FastifyRequest<{
    Body: IUserSignupDto;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { email, firstName, lastName, patronimicName, phone } = request.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return reply.code(ERRORS.userExists.statusCode).send(ERRORS.userExists);
    }
    const password = generator.generate({
      length: 14,
      numbers: true
    });
    // const hashPass = await utils.genSalt(10, password);
    const createPayload = {
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      patronimicName: patronimicName.trim(),
      phone: phone.trim(),
      password,
    }
    const createUser = await User.create(createPayload);
    const token = JWT.sign(
      {
        id: createUser.id,
        email: createUser.email,
      },
      process.env.APP_JWT_SECRET as string,
    );
    mailer.sendPassword(createUser.email, password);
    delete createUser.password;

    return reply.code(STANDARD.OK.statusCode).send({
      token,
    });

    
  } catch (err) {
    return handleServerError(reply, err);
  }
};

export const resetPassword = async (
  request: FastifyRequest<{
    Body: IUserResetPassDto;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email.toLowerCase() }, { phone: email }],
      },
    });
    if (!user) {
      return reply.code(ERRORS.userNotExists.statusCode).send(ERRORS.userNotExists);
    }
    const password = generator.generate({
      length: 14,
      numbers: true
    });
    await User.update({ password }, {where: { id: user.id }});
    mailer.sendPassword(user.email, password);

    return reply.code(STANDARD.OK.statusCode).send({});

  } catch (err) {
    return handleServerError(reply, err);
  }
};

export const getMe = async (
  request: FastifyRequest<{}>,
  reply: FastifyReply,
) => {
  try {
    
    return reply.code(STANDARD.OK.statusCode).send({});

  } catch (err) {
    return handleServerError(reply, err);
  }
};
