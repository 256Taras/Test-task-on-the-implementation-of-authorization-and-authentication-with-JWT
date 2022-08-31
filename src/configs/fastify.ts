export const fastifyConfig = {
  ajv: {
    customOptions: {
      removeAdditional: false,
      useDefaults: true,
      coerceTypes: true,
      strictTypes: true,
      jsonPointers: true,
      allErrors: true,
    },
    plugins: [],
  },
};
