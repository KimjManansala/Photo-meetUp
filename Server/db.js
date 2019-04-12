const pgPromise = require('pg-promise')()


const config = {
    host: 'localhost',
    port: 5432,
    database: 'photo_DB',
    user: 'postgres'
}

const db = pgPromise(config)


module.exports= db