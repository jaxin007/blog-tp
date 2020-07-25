const { PostgresService } = require('./postgres.service');

const postgresService = new PostgresService();

module.exports = {
  PostgresService,
  postgresService,
};
