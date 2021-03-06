const { PostgresService } = require('./index');
const { hashPassword, checkPasswords } = require('../utils/bcrypt');

class UserService {
  /**
   * @param {PostgresService} postgresService
   */
  constructor(postgresService) {
    this.postgresService = postgresService;
  }

  async registerUser(user) {
    const { username, password } = user;

    const hashedPassword = await hashPassword(password);

    const userData = {
      username,
      password: hashedPassword,
    };

    try {
      const createdUser = await this.postgresService
        .knex('users')
        .insert(userData)
        .returning('*');

      return createdUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllUsers() {
    const allUsers = await this.postgresService
      .knex('users')
      .select(['username', 'id', 'role', 'created_at'])
      .returning('*');

    return allUsers;
  }

  async getUserById(id) {
    const userById = await this.postgresService
      .knex('users')
      .where('id', id)
      .first()
      .returning('*');

    return userById;
  }

  async getUserByData(username) {
    const userByData = await this.postgresService
      .knex('users')
      .where({ username })
      .first();

    return userByData;
  }

  async createPost(body, userId) {
    const createdPost = await this.postgresService
      .knex('posts')
      .insert({ body, author: userId })
      .returning('*');

    return createdPost;
  }

  async getPostsByUserId(userId) {
    const userByPostId = await this.postgresService // get the user by post id
      .knex('users')
      .where('id', userId)
      .select(['id', 'username', 'role'])
      .first()
      .returning('*');

    const postsById = await this.postgresService
      .knex('posts')
      .where('author', userId)
      .select()
      .then((posts) => posts.map((value) => {
        const postsByUserId = value;

        postsByUserId.author = userByPostId; // replace author id by user info from users table

        return postsByUserId;
      }))
      .then((posts) => {
        posts.push({ author: userByPostId });
        return posts;
      });

    return postsById;
  }
}

module.exports = {
  UserService,
};
