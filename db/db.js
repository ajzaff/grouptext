cassandra = require('cassandra-driver');
var async = require('async');


var client = new cassandra.Client({
	contactPoints: ['127.0.0.1'],
	keyspace: 'prod'
})