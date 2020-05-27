exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description');
        table.string('img_profile');
        table.string('key');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
