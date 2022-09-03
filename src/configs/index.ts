import { fastifyConfig } from './fastify';
import { corsConfig } from './cors';
import { jwtConfig } from './jwt';
import { tables } from './tables';
import { dbConfig } from './db';
import { loggerConfig } from './logger';
import * as constants from './constants';

export { fastifyConfig, constants, loggerConfig, dbConfig, tables, corsConfig, jwtConfig };
