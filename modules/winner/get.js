var db = require("../mongo/db.js");

function get (callback) {
	db.getAll(callback);
}
module.exports = get;