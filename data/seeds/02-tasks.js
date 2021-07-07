exports.seed = function(knex) {
  return knex("tasks").insert([
    {
      task_name: "Survive until labs",
      task_description: "Gotta finish labs to finish school",
      task_notes: "You got this, my guy",
      completed: false,
      project_id: 1
    },
    {
      task_name: "Survive CS",
      task_description: "Gotta learn CS to nail the interview",
      task_notes: "You got this, my dude",
      completed: false,
      project_id: 1
    },
    {
      task_name: "Find Employer",
      task_description: "Gotta find someone to hire ya",
      task_notes: "You got this, future self",
      completed: false,
      project_id: 2
    },
    {
      task_name: "Nail interview",
      task_description: "Gotta nail that interview to land the job",
      task_notes: "You got this, compadre",
      completed: false,
      project_id: 2
    },
    {
      task_name: "Aquire Sammurai sword",
      task_description: "Gotta have the blade to do the deed",
      task_notes: "You got this, internet dweller",
      completed: false,
      project_id: 3
    },
    {
      task_name: "Strike true",
      task_description: "Gotta nail the right spot to be honored",
      task_notes: "You got this, sensei",
      completed: false,
      project_id: 3
    }
  ]);
};
