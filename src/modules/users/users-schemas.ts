export const idType = {
  anyOf: [
    {
      type: 'integer',
    },
    {
      type: 'string',
      minLength: 3,
      format: 'email',
    },
  ],
};

/**
 * Main Schema
 */
export const usersSchema = {
  info: {
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { format: 'uuid', type: 'string' },
          idType,
        },
        required: ['id', 'idType'],
      },
    },
  },
  latency: {
    response: {
      200: {
        type: 'object',
        additionalProperties: false,
        properties: {
          result: { type: 'string' },
        },
        required: ['result'],
      },
    },
  },
};
