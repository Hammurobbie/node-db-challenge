const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("resources");
}

function findById(id) {
  return db("resources").where({ id: id });
}

function add(resource) {
  return db("resources")
    .insert(resource)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("resources")
    .where({ id: id })
    .update(changes);
}

function remove(id) {
  return db("resources")
    .where({ id: id })
    .del();
}
