const { PostgresService } = require('./index');

class UserService {
  /**
   * @param {PostgresService} postgresService
   */
  constructor(postgresService) {
    this.postgresService = postgresService;
  }

  async registerUser(user) {
    const userData = { username: user.name, password: user.password };

    const createdUser = await this.postgresService
      .knex('users')
      .insert(userData)
      .returning('*');

    return createdUser;
  }

  async getAllUsers() {
    const allUsers = await this.postgresService
      .knex('users')
      .select(['username', 'id', 'created_at'])
      .returning('*');

    return allUsers;
  }

  async getUserById(id) {
    const userById = await this.postgresService
      .knex('users')
      .where('id', id)
      .returning('*');

    return userById;
  }
}

module.exports = {
  UserService,
};
