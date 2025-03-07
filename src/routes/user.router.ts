import { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import { utils } from '../utils';
import { loginSchema, resetPassSchema, signupSchema } from '../schemas/User';


async function userRouter(fastify: FastifyInstance) {
  fastify.post(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
        },
      },
      config: {
        description: 'User login endpoint',
      },
      preValidation: utils.preValidation(loginSchema),
    },
    controllers.login,
  );

  fastify.post(
    '/signup',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email']
        },
      },
      config: {
        description: 'User signup endpoint',
      },
      preValidation: utils.preValidation(signupSchema),
    },
    controllers.signUp,
  );

  fastify.post(
    '/resetPassword',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string'},
          },
        },
      },
      config: {
        description: 'User reset pass endpoint',
      },
      preValidation: utils.preValidation(resetPassSchema),
    },
    controllers.resetPassword,
  );

  fastify.get(
    '/',
    {
      schema: {},
      config: {
        description: 'Get user by token endpoint',
      },
    },
    controllers.getMe,
  );
}

export default userRouter;
