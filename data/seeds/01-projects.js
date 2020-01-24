exports.seed = function(knex) {
  return knex("projects").insert([
    {
      project_name: "Complete Lambda School",
      project_description: "Gotta finish school to get a job",
      project_notes: "You got this",
      completed: false
    },
    {
      project_name: "Get a job",
      project_description: "Gotta get a job to not die",
      project_notes: "You got this, too",
      completed: false
    },
    {
      project_name: "Die an honorable Sammurai death",
      project_description: "Gotta die in a cool way, if you`ve gotta go",
      project_notes: "You probably don`t got this",
      completed: false
    }
  ]);
};
