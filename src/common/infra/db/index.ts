import pg, { Pool } from 'pg';

import { dbConfig } from '../../../configs';
import { mapDbError } from '../../errors/db';
import { container } from '../container';
import { TOKENS } from '../../../types';

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
  const logger = container.get(TOKENS.loggerService);
  try {
    const awaitToQuery = await db.query(query, bindings);

    const queryResult = Array.isArray(awaitToQuery?.rows) ? awaitToQuery?.rows : awaitToQuery;
    if (enableLog === true) {
      logger.debug('query: ' + query);
      logger.debug(JSON.stringify(queryResult));
    }
    return Array.isArray(queryResult) ? queryResult.map(resultMapper) : [queryResult].map(resultMapper);
  } catch (error) {
    if (enableLog === true) {
      logger.debug('query: ' + query);
      // @ts-ignore
      logger.debug(error);
    }
    throw errorMapper(error);
  }
};
