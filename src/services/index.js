const { PostgresService } = require('./postgres.service');
const { UserService } = require('./user.service');

const postgresService = new PostgresService();
const userService = new UserService(postgresService);

module.exports = {
  PostgresService,
  postgresService,
  UserService,
  userService,
};
