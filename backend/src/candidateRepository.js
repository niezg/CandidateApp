const { Pool } = require("pg");
const { ConnectionString } = require("./config");

const pool = new Pool({
  connectionString: ConnectionString,
  ssl: true,
  max: 3
});

async function queryHandler(query, parameters) {
  return new Promise((resolve, reject) => {
    pool.connect((connect_error, client, done) => {
      if (connect_error) {
        reject(connect_error);
        return;
      }
      client.query(query, parameters, (query_error, result) => {
        done();
        if (query_error) {
          reject(query_error.stack);
        } else {
          resolve(result.rows);
        }
      });
    });
  });
}

exports.queryHandler = queryHandler;
