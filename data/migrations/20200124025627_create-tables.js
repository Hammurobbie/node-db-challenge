exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.text("project_name").notNullable();
      tbl.text("project_description");
      tbl.text("project_notes");
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo();
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .text("task_name")
        .unique()
        .notNullable();
      tbl.text("task_description").notNullable();
      tbl.text("task_notes");
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .text("resource_name")
        .unique()
        .notNullable();
      tbl.text("resource_description");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
