/* eslint-disable no-shadow,consistent-return,no-unused-vars */
const knex = require('knex');

/**
 * @param {knex} knex
 */
exports.up = function (knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username', 100).unique().notNullable();
        table.string('password', 100).notNullable();
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('role', 100).defaultTo(0);
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
