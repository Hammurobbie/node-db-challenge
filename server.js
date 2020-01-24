const express = require("express");

const resourceRouter = require("./Resources/resource-router");
const projectRouter = require("./Projects/project-router");
const taskRouter = require("./Tasks/task-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API Sprint Challenge");
});

server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

module.exports = server;
