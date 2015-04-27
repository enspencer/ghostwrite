var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// @todo change this to process.env.DATABASE_URL
var connectionString = "postgres://emmaspencer:cushings@localhost/ghostwriteio_development";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});

/* GET letter_types */
router.get('/api/letter_types', function(req, res) {

  var results = [];

  // Get a PG client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

	var query = client.query('SELECT * FROM letter_types ORDER BY id ASC;');

	// Stream results back one row at a time
	query.on('row', function(row) {
		results.push(row);
	});

	// After all data is returned, close connection and return results
	query.on('end', function() {
		client.end();
		return res.json(results);
	});

	if(err) {
		console.log(err);
	}
  });
});

/* CREATE letter_types*/
router.post('/api/letter_types', function(req, res) {

  var results = [];

  // Grab data from http request
  var data = {name: req.body.name, category: req.body.category};

  // Get a PG client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

  	// Insert one into db
	client.query('INSERT INTO letter_types(name, category) values($1, $2)', [data.name, data.category]);

	// Read all from db
	var query = client.query('SELECT * FROM letter_types ORDER BY id ASC;');

	// Stream results back one row at a time
	query.on('row', function(row) {
		results.push(row);
	});

	// After all data is returned, close connection and return results
	query.on('end', function() {
		client.end();
		return res.json(results);
	});

	// Handle errors
	if(err) {
		console.log(err);
	}
  });
});

/* Update letter_type */
// @todo GET THIS WORKING
// curl PUT --data "name=yo&category=2" http://localhost:3000/api/letter_types/2
router.put('/api/letter_types/:type_id', function(req, res) {
  var results = [];

  // Grab data from URL parameters
  var id = req.params.type_id;

  // Grab data from http request
  var data = {name: req.body.name, category: req.body.category};

  // Get a PG client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

  	// Insert one into db
	client.query('UPDATE letter_types SET name=($1), category=($2) WHERE id=($3)', [data.name, data.category, id]);

	// Read updated letter_type from db
	var query = client.query('SELECT * FROM letter_types WHERE id=($1)', [id]);

	// Stream results back one row at a time
	query.on('row', function(row) {
		results.push(row);
	});

	// After all data is returned, close connection and return results
	query.on('end', function() {
		client.end();
		return res.json(results);
	});

	// Handle errors
	if(err) {
		console.log(err);
	}
  });
});

/* Delete letter_type*/
// fix this
// curl -X DELETE http://localhost:3000/api/letter_types/:id
router.put('/api/letter_types/:type_id', function(req, res) {
  var results = [];

  // Grab data from URL parameters
  var id = req.params.type_id;

  // Get a PG client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

  	// Insert one into db
	client.query('DELETE FROM letter_types WHERE id=($1)', [id]);

	// Read updated letter_type from db
	var query = client.query('SELECT * FROM letter_types ORDER BY id ASC');

	// Stream results back one row at a time
	query.on('row', function(row) {
		results.push(row);
	});

	// After all data is returned, close connection and return results
	query.on('end', function() {
		client.end();
		return res.json(results);
	});

	// Handle errors
	if(err) {
		console.log(err);
	}
  });
});


module.exports = router;
