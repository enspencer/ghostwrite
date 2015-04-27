var pg = require('pg');
// @todo change this to process.env.DATABASE_URL
var connectionString = "postgres://emmaspencer:cushings@localhost/ghostwriteio_development";

var client = new pg.Client(connectionString);
client.connect();
var query =client.query('SELECT name AS name FROM letter_types');
query.on('end', function() { client.end(); });