const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  // tasks,
  findTaskByProjectId,
  findResourceByProjectId,
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
  return (
    db("projects")
      // .join("tasks", "projects.id", "tasks.project_id")
      // .join("resources", "projects.id", "resources.project_id")
      .select(
        "projects.id",
        "projects.project_name",
        "projects.project_description",
        "projects.completed"
      )
      .where({ id })
      .first()
  );
}

function findTaskByProjectId(project_id) {
  return db("projects as p")
    .join("tasks as t", "p.id", "t.project_id")
    .select("t.task_name", "t.task_description", "t.task_notes", "t.completed")
    .where({ project_id });
}

function findResourceByProjectId(project_id) {
  return db("projects as p")
    .join("resources as r", "p.id", "r.project_id")
    .select("r.resource_name", "r.resource_description")
    .where({ project_id });
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
