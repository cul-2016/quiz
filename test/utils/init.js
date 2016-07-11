import Server from '../../server/server.js';
export const server = Server.init(process.env.PORT);
import pg from 'pg';

export const testClient = new pg.Client({ database: 'testing' });
// end to end testing => pool and testing pg client need to refer to the same one when testing endpoints!
