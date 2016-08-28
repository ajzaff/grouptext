var models = require("express-cassandra");


models.setDirectory(__dirname + "/models").bind({
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
	if (err)
		console.error(err.message);
	else
		console.log(models.timeuuid());
});