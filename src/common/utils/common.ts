export const convertToObjectOrEmptyObject = <T>(data: any): T => {
  if (typeof data === 'object') return data;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {} as T;
};

export const lookup = <T>(arr: T[]): T => arr[0];
