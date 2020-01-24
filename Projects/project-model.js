const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  // tasks,
  add,
  update,
  remove
};

function find() {
  // const bool = db.column("completed").from("projects");

  // const newBool = bool ? true : false;

  // const project = db
  //   .column("id", "project_name", "project_description", "project_notes")
  //   .from("projects");

  // const newProjArr = [];

  // project.map(proj => {
  //   proj.completed = newBool;
  //   newProjArr.push(proj);
  //   console.log("newProj", newProjArr);
  // });

  // console.log("project", project);

  return db
    .column(
      "id",
      "project_name",
      "project_description",
      "project_notes",
      "projects.completed"
    )
    .from("projects");
  // .column("project.completed")
  // .from("projects");
}

function findById(id) {
  return db("projects")
    .join("tasks", "projects.id", "tasks.project_id")
    .join("resources")
    .where("projects.id", "=", id);
}

function add(project) {
  return db("projects")
    .insert(project)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("projects")
    .where({ id: id })
    .update(changes);
}

function remove(id) {
  return db("projects")
    .where({ id: id })
    .del();
}
