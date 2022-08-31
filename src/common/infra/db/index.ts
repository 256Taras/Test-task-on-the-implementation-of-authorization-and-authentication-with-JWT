import pg, { Pool } from 'pg';

import { dbConfig } from '../../../configs/db';
import { mapDbError } from '../../errors/db';

export const db: Pool = new pg.Pool(dbConfig);

interface IQueryRunner<T, E = Error> {
  query: string;
  bindings?: any[];
  resultMapper: (v: any) => T;
  errorMapper?: (v: any) => E;
  enableLog?: boolean;
}

export const queryRunner = async <T>({
  query,
  resultMapper,
  errorMapper = mapDbError,
  enableLog,
  bindings = [],
}: IQueryRunner<T>): Promise<T[]> => {
  try {
    const awaitToQuery = await db.query(query, bindings);

    const queryResult = Array.isArray(awaitToQuery?.rows)
      ? awaitToQuery?.rows
      : awaitToQuery;
    if (enableLog === true) {
      console.log('query: ', query);
      console.log('queryResult: ', queryResult);
    }
    return Array.isArray(queryResult)
      ? queryResult.map(resultMapper)
      : [queryResult].map(resultMapper);
  } catch (error) {
    if (enableLog === true) {
      console.log(query);
      console.log('Repository error: ', error);
    }
    throw errorMapper(error);
  }
};
