exports.seed = function(knex) {
  return knex("resources").insert([
    {
      resource_name: "Computer",
      resource_description: "Gotta have this to do anything",
      project_id: 1
    },
    {
      resource_name: "Money",
      resource_description: "Gotta money",
      project_id: 3
    },
    {
      resource_name: "Cripping anxiety and depression",
      resource_description:
        "Gotta live with this shit beacuse it`s not going anywhere",
      project_id: 3
    },
    {
      resource_name: "Water",
      resource_description: "Gotta remain a hydro homie for life",
      project_id: 2
    }
  ]);
};
