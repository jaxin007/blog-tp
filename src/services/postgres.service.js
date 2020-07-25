const knex = require('knex');
require('dotenv').config();

class PostgresService {
  constructor() {
    this.knex = knex({
      client: 'postgresql',
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      },
      pool: { min: 0, max: 7 },
    });
  }
}

module.exports = {
  PostgresService,
};
