import { idType } from '../users/users-schemas';

const authCommonSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    refreshToken: { type: 'string' },
    token: { type: 'string' },
  },
  required: ['token', 'refreshToken'],
};

/**
 * Main Schema
 */
export const authSchemas = {
  signup: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: idType,
        password: { type: 'string' },
      },
      required: ['id', 'password'],
    },
    response: {
      200: authCommonSchema,
    },
  },
  signin: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['id', 'password'],
    },
    response: {
      200: authCommonSchema,
    },
  },
  logout: {
    querystring: {
      all: { type: 'boolean' }
    },
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          success: { type: 'boolean' },
        },
        required: ['success'],
      },
    },
  },
  refresh: {
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          token: { type: 'string' },
        },
        required: ['token'],
      },
    },
  },
};
