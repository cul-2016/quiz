# quiz

### Getting up and running

#### Database

Install postgres:
```bash
brew update
brew doctor
brew install postgres
```

To run the postgres server:

```bash
postgres -D /usr/local/var/postgres
```

#### Testing

**Postgres**

When creating a client for the tests, we have to provide options to the `pg`.Pool.
    -  `idleTimeoutMillis` will quit the client automatically after a given number of milliseconds (i.e. 3000 = 3 seconds)
    - `database` will link the client to the given database (for us its the `testing` database)

    #### DB setup alongside PG NPM module

    - Eventually settled on having the client passed down to the query function, so that when the function is run either in the test or production, we can specify exactly which client to connect to.
    - each client is pooled, so that there is less of a bottleneck, currently set the pool connections to 100. check pg module documentation for more information. https://github.com/brianc/node-postgres
