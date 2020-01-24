module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/Projects.db",
      typeCast: function(field, next) {
        if (field.type === "TINY" && field.length === 1) {
          return field.string() === "1"; // 1 = true, 0 = false
        } else {
          return next();
        }
      }
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
