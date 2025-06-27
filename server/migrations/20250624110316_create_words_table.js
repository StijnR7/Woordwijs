exports.up = function (knex) {
  return knex.schema.createTable("words", function (table) {
    table.increments("id").primary();
    table.string("word").notNullable();
    table.json("description").notNullable(); // <- Hier JSON ipv text
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("words");
};
