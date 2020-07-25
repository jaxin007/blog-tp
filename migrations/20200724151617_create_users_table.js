/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
const knex = require('knex');

/**
 * @param {knex} knex
 */
exports.up = function (knex) {
  return knex.schema.hasTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 100).notNullable();
    table.string('password', 100).notNullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

/**
 * @param {knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
