# quiz


## Getting up and running

####This project uses Node version 4.4.7

#### Database

Install postgres:
```bash
brew update
brew doctor
brew install postgres
```


To run the postgres server.

```bash
postgres -D /usr/local/var/postgres
```


This project comes with a handy convenience script to run the postgres server.  Simply:
```bash
npm run postgres
```

#### Testing

**Postgres**

When creating a client for the tests, we have to provide options to the `pg`.Pool.
    - `idleTimeoutMillis` will quit the client automatically after a given number of milliseconds (i.e. 3000 = 3 seconds)
    - `database` will link the client to the given database (for us its the `testing` database)

    #### DB setup alongside PG NPM module

    - Eventually settled on having the client passed down to the query function, so that when the function is run either in the test or production, we can specify exactly which client to connect to.
    - Each client is pooled, so that there is less of a bottleneck, currently set the pool connections to 100. Check pg module documentation for more information. https://github.com/brianc/node-postgres

    - **To setup the schema on HEROKU use the following command**
    ```bash
    heroku pg:psql --app (APPNAME) DATABASE < ./path/to/schema
    ```
    - to connect heroku db to pgAdmin
        - go to `File > Add Server`.
        - then follow this link - http://stackoverflow.com/questions/11769860/connect-to-a-heroku-database-with-pgadmin

#### HAPI

reply.state('cookie_name', cookie, { path: "/" }) **cookie** needs to be set to string, it cannot be a string.

#### CHECK COVERAGE file
    changed script to `check-coverage": "babel-node ./node_modules/babel-istanbul/lib/cli.js check-coverage"`
    - dont need the tape and test file paths as the script for coverage will do so.

    Also changed the istanbul.yml file to cover both root folders as follows `root: [ ./src, ./server ]`
