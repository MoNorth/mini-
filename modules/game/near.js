
var connect = require("./connect");

function getNear (username, x, y) {
	
	connect(username, x, y, function(user){});
	var user = global.queen_write[username];
	var nears = [];
	var x = user.x, 
		y = user.y;


	for(var u in global.queen_write)
	{
		if(Math.abs(global.queen_write[u].x - x) < 1 && Math.abs(global.queen_write[u].y - y) < 1 )
			nears.push(u);
	}
	return nears;
}
module.exports = getNear;
