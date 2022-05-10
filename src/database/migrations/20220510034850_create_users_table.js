/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.decimal('balance', 10, 2).defaultTo(0);
      table.string('account_no').unique().nullable();
      table.timestamps(true, true);
    });
  };
  
  /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  