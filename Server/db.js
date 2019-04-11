const pgPromise = require('pg-promise')()

const albumData = require('./arrayOfAlbums')
const config = {
    host: 'localhost',
    port: 5432,
    database: 'music_db',
    user: 'postgres'
}

const db = pgPromise(config)


module.exports= db