exports.up = async function(knex) {
    await knex.schema.createTable('replies', table => {
        table.increments();
        table.string('intent').notNullable();
        table.integer('order').unsigned().notNullable().defaultTo(1);
        table.string('type').notNullable();
        table.text('text');
    }); 
};

exports.down = async function(knex) {
    await knex.schema.dropTable('replies');
};
