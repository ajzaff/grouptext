module.exports = {
	fields: {
		id: {
			type: "uuid",
			default: {
				"$db_function": "uuid()"
			}
		},
		created: {
			type: "timestamp",
			default: {
				"$db_function": "toTimestamp(now())"
			}
		},
		name: {
			type: "varchar",
			rule: {
				validator: function(value) { return true; },
				message: function(value) {
					return "name '" + value + "' is invalid.";
				},
				required: true
			}
		},
		email: {
			type: "varchar",
			rule: {
				validator: function(value) { return true; },
				message: function(value) {
					return "email '" + value + "' is invalid.";
				},
				required: true
			}
		}
	},
	key: [
		["id"], "email"
	]
}