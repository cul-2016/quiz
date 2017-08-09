const fs = require('fs');
const async = require('async');
const pg = require('pg');
const Hoek = require('hoek');
const path = require('path');
require('hapi-postgres-connection');

// var databaseUrl = process.env.DATABASE_URL;
//Here we need to check if the application is being run on heroku, so we can add ?ssl=true to the DB URL
// var databaseArray = process.env.DATABASE_URL.split('/');

//this is ignored as the if statement is checking if the app is being run using the heroku sql DB. That will
//never be true when running locally.
/* istanbul ignore if */
// var databaseName = databaseArray[ databaseArray.length - 1 ];
// if (databaseName === process.env.DATABASE_NAME) {//production
var databaseUrl = process.env.DATABASE_URL + '?ssl=true';
// }

module.exports = (callback = Hoek.ignore) => {

  const client = new pg.Client(databaseUrl);

  async.series(
    {
      _a: client.connect.bind(client), //connecting to pg db
      _b: createMigrationsTableIfNotExists(client),
      previousMigrations: getMigrations(client), //gets previously run migrations from db
      allMigrations: readMigrationsDir //gets all the migrations in the migrations folder
    }
    ,
    (error, {previousMigrations, allMigrations}) => {

      if (error) {
        console.error('Applying migrations setup error: ', error);
        Hoek.assert(!error);
      }
      //only runs migrations that have not been run before
      const migrationsFilesToRun = allMigrations
        .filter(m => !previousMigrations.includes(m));

      const completedMigrations = [];
      const dir = path.resolve(__dirname + '/migrations');

      const migrationFunctions = migrationsFilesToRun
        .map(fileName => `${dir}/${fileName}`)
        .map((filePath) => readFileAndExecute(client, completedMigrations, filePath));
        //migration functions is an array of functions that run the migrations

      async.series(migrationFunctions, (err) => {

        if (err) {
          console.error('Applying migrations error: ', err);
        }

        addCompletedMigrationsToDb(client, completedMigrations, (err) => {

          if (err) {
            console.error('Adding run migrations to db error: ', err);
          }

          client.end();
          callback();

        });
      });
    }
  );
};

const createMigrationsTableIfNotExists = (client) => (callback) => {

  const query = `
    CREATE TABLE IF NOT EXISTS migrations(
      migration_id SERIAL PRIMARY KEY,
      migration_file TEXT
    )`;

  client.query(query, callback);
};

const getMigrations = (client) => (callback) => {

  const query = `
    SELECT migration_file
    FROM migrations`;

  client.query(query, (error, result) =>
    callback(error, result.rows.map(row => row.migration_file))
  );
};

const readMigrationsDir = (callback) => {

  const dir = path.resolve(__dirname + '/migrations');
  fs.readdir(dir, callback);
};

const readFileAndExecute = (client, completedMigrations, filePath) => (callback) => {

  if (path.extname(filePath) === '.sql') {

    const query = fs.readFileSync(filePath).toString();
    client.query(query, addToCompletedIfNoError);

  } else {

    const jsMigration = require(filePath);
    jsMigration(client, addToCompletedIfNoError);

  }

  function addToCompletedIfNoError(error, result) {
    if (!error) {
      completedMigrations.push(path.basename(filePath));
    }
    callback(error, result);
  }

};

const addCompletedMigrationsToDb = (client, completedMigrations, callback) => {

  if(completedMigrations.length === 0) {
    return callback();
  }

  const querySuffix = completedMigrations
    .map(m => `('${m}') `)
    .join(', ');

  const query = `
    INSERT INTO migrations (migration_file)
    VALUES ${querySuffix}`;

  client.query(query, callback);
};
