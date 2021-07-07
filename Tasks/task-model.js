const db = require("../data/db-config");

module.exports = {
  findById,
  tasks,
  add,
  update,
  remove
};

function tasks() {
  return db
    .column(
      "id",
      "task_name",
      "task_description",
      "task_notes",
      "tasks.completed",
      "tasks.project_id"
    )
    .from("tasks");
}

function findById(id) {
  return db("tasks").where({ id: id });
}

function add(task) {
  return db("tasks")
    .insert(task)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("tasks")
    .where({ id: id })
    .update(changes);
}

function remove(id) {
  return db("tasks")
    .where({ id: id })
    .del();
}
