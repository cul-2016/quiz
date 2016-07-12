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

**Postgress**

When creating a client for the tests, we have to provide options to the `pg`.Pool.
    -  `idleTimeoutMillis` will quit the client automatically after a given number of milliseconds (i.e. 3000 = 3 seconds)
    - `database` will link the client to the given database (for us its the `testing` database)
