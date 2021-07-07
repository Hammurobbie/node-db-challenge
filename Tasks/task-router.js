const express = require("express");

const task = require("./task-model");

const router = express.Router();

router.post("/add", (req, res) => {
  task
    .add(req.body)
    .then(task => res.json(task))
    .catch(err => {
      res.status(500).json({ message: "The task could not be created" });
      console.log(err.message);
    });
});

router.get("/", (req, res) => {
  const projArray = [];
  task
    .tasks()
    .then(pro => {
      pro.map(project => {
        project.completed
          ? projArray.push({
              id: project.id,
              task_name: project.task_name,
              task_description: project.task_description,
              task_notes: project.task_notes,
              completed: true,
              project_id: project.project_id
            })
          : projArray.push({
              id: project.id,
              task_name: project.task_name,
              task_description: project.task_description,
              task_notes: project.task_notes,
              completed: false,
              project_id: project.project_id
            });
        console.log(project);
      });
      res.send(projArray);
      // res.json(pro);
    })
    .catch(err => {
      res.status(500).json({ message: "The tasks could not be returned" });
      console.log(err.message);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  task
    .findById(id)
    .then(pro => {
      if (pro) {
        task.update(changes, id).then(newPro => res.json(newPro));
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The task could not be updated" });
      console.log(err.message);
    });
});

router.delete("/:id", (req, res) => {
  task
    .remove(req.params.id)
    .then(pro => res.json(pro))
    .catch(err => {
      res.status(500).json({ message: "The tasks could not be removed" });
      console.log(err.message);
    });
});

module.exports = router;
