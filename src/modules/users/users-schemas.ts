import S from 'fluent-json-schema';

/**
 * @Example
 * +380445371428
 * +38(044)5371428
 * +38(044)537 14 28
 */
const pattern =
  '^(?:\\+38)?(?:\\(044\\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$';

export const idType = S.anyOf([S.string().pattern(pattern), S.string().format('email').minLength(3)]);

/**
 * Main Schema
 */
export const usersSchema = {
  info: {
    response: {
      200: S.object()
        .title('user info')
        .additionalProperties(false)
        .prop('id', S.string().format('uuid').required())
        .prop('idType', idType.required()),
    },
  },
  latency: {
    response: {
      200: S.object().title('google latency').additionalProperties(false).prop('result', S.string().required()),
    },
  },
};
