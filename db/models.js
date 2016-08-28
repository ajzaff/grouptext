var models = require("express-cassandra");
var path = require("path");


models.setDirectory(path.join(__dirname, "..", "models")).bind({
	clientOptions: {
		contactPoints: ["127.0.0.1"],
		protocolOptions: {},
		keyspace: "prod",
		queryOptions: {
			consistency: models.consistencies.one
		}
	},
	ormOptions: {
		defaultReplicationStrategy: {
			class: "SimpleStrategy",
			replication_factor: 1
		},
		migration: "safe",
		createKeyspace: true
	}
},
function(err) {
	if (err) {
		console.error(err.message);
		console.error(err.innerErrors);
	} else {
		console.log(models.timeuuid());
	}
});