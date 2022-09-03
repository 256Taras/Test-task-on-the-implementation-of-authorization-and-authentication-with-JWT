import S from 'fluent-json-schema';

import { idType } from '../users/users-schemas';

const authCommonSchema = S.object()
  .additionalProperties(false)
  .prop('refreshToken', S.string().required())
  .prop('token', S.string().required());

const authBody = S.object().additionalProperties(true).prop('id', idType.required()).prop('password', S.string().required());

/**
 * Main Schema
 */
export const authSchemas = {
  signup: {
    body: authBody,
    response: {
      200: authCommonSchema,
    },
  },
  signin: {
    body: authBody,
    response: {
      200: authCommonSchema,
    },
  },
  logout: {
    querystring: S.object().additionalProperties(false).prop('all', S.boolean()),
    response: {
      200: S.object().additionalProperties(false).prop('success', S.boolean().required()),
    },
  },
  refresh: {
    response: {
      200: S.object().additionalProperties(false).prop('token', S.string().required()),
    },
  },
};
