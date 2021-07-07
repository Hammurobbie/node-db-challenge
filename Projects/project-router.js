const express = require("express");

const projects = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  const projArray = [];

  projects
    .find()
    .then(pro => {
      pro.map(project => {
        project.completed
          ? projArray.push({
              id: project.id,
              project_name: project.project_name,
              project_description: project.project_description,
              project_notes: project.project_notes,
              completed: true
            })
          : projArray.push({
              id: project.id,
              project_name: project.project_name,
              project_description: project.project_description,
              project_notes: project.project_notes,
              completed: false
            });
      });
      res.send(projArray);
      // res.json(pro);
    })
    .catch(err => {
      res.status(500).json({ message: "The projects could not be returned" });
      console.log(err.message);
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tasks = await projects.findTaskByProjectId(id);
  const resources = await projects.findResourceByProjectId(id);
  projects
    .findById(id)
    .then(pro => {
      console.log(
        "pro",
        projects.findTaskByProjectId(id).then(task => ({
          task_name: task.task_name,
          task_description: task.task_description,
          task_notes: task.task_notes
        }))
      );
      const project_stuff = {
        id: id,
        project_name: pro.project_name,
        project_description: pro.project_description,
        project_notes: pro.project_notes,
        completed: Boolean(pro.completed),
        tasks: tasks.map(tsk => ({
          task_name: tsk.task_name,
          task_description: tsk.task_description,
          task_notes: tsk.task_notes,
          completed: Boolean(tsk.completed)
        })),
        resources: resources.map(rsrc => ({
          resource_name: rsrc.resource_name,
          resource_description: rsrc.resource_description
        }))
      };
      res.status(200).json(project_stuff);
    })
    .catch(err => {
      res.status(500).json({ message: "The projects could not be returned" });
      console.log(err.message);
    });
});

router.post("/", (req, res) => {
  projects
    .add(req.body)
    .then(pro => res.json(pro))
    .catch(err => {
      res.status(500).json({ message: "The project could not be created" });
      console.log(err.message);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projects
    .findById(id)
    .then(pro => {
      if (pro) {
        projects.update(changes, id).then(newPro => res.json(newPro));
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The project could not be updated" });
      console.log(err.message);
    });
});

router.delete("/:id", (req, res) => {
  projects
    .remove(req.params.id)
    .then(pro => res.json(pro))
    .catch(err => {
      res.status(500).json({ message: "The projects could not be removed" });
      console.log(err.message);
    });
});

module.exports = router;
