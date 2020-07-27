/* eslint-disable no-shadow */
const knex = require('knex');

/**
 * @param {knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('body', 1000).notNullable();
    table
      .integer('author')
      .index()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });
};

/**
 * @param {knex} knex
 */
exports.down = function (knex) {
  return knex.schema.table('posts', (table) => {
    table.dropColumns(['id', 'body', 'author']);
  });
};
