var db = require("../mongo/db.js");

function saveWinner (username, x, y, callback) {
	var time = new Date().getTime();
	db.add({username:username,x:x,y:y,time:time},callback);
}

module.exports = saveWinner;