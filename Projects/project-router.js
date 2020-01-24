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

router.get("/:id", (req, res) => {
  const projArray = [];

  projects
    .findById(req.params.id)
    .then(pro => {
      // pro.map(project => {
      pro.completed
        ? projArray.push({
            id: req.params.id,
            project_name: pro[0].project_name,
            project_description: pro[0].project_description,
            project_notes: pro[0].project_notes,
            completed: false,
            tasks: [
              {
                task_name: pro[0].task_name,
                task_description: pro[0].task_description,
                task_notes: pro[0].task_notes
              }
            ],
            resources: [
              {
                resource_name: pro[0].resource_name,
                resoursce_description: pro[0].resource_description
              }
            ]
          })
        : projArray.push({
            id: req.params.id,
            project_name: pro[0].project_name,
            project_description: pro[0].project_description,
            project_notes: pro[0].project_notes,
            completed: false,
            tasks: [
              {
                task_name: pro[0].task_name,
                task_description: pro[0].task_description,
                task_notes: pro[0].task_notes
              }
            ],
            resources: [
              {
                resource_name: pro[0].resource_name,
                resoursce_description: pro[0].resource_description
              }
            ]
          });

      console.log("projArray", projArray);

      console.log("pro", pro);
      res.send(projArray);
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
