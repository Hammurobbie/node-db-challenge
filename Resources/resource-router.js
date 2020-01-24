const express = require("express");

const resource = require("./resource-model");

const router = express.Router();

router.get("/", (req, res) => {
  resource
    .find()
    .then(rs => res.json(rs))
    .catch(err => {
      res.status(500).json({ message: "The resources could not be returned" });
      console.log(err.message);
    });
});

router.get("/:id", (req, res) => {
  resource
    .findById(req.params.id)
    .then(rs => res.json(rs))
    .catch(err => {
      res.status(500).json({ message: "The resource could not be returned" });
      console.log(err.message);
    });
});

router.post("/", (req, res) => {
  resource
    .add(req.body)
    .then(pro => res.json(pro))
    .catch(err => {
      res.status(500).json({ message: "The resource could not be created" });
      console.log(err.message);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  resource
    .findById(id)
    .then(pro => {
      if (pro) {
        resource.update(changes, id).then(newPro => res.json(newPro));
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The resource could not be updated" });
      console.log(err.message);
    });
});

router.delete("/:id", (req, res) => {
  resource
    .remove(req.params.id)
    .then(pro => res.json(pro))
    .catch(err => {
      res.status(500).json({ message: "The resources could not be removed" });
      console.log(err.message);
    });
});

module.exports = router;
