

global.queen_write = {};
var username_index = 0;

function connect (username, x, y, callback){
	if(!username) username = username_index ++;
	global.queen_write[username + ""] = {
		x : x,
		y : y,
		time : new Date().getTime()
	};
	callback(username + "");
	console.log("Connect : " + username);
	console.log(global.queen_write);
}


(function(){
	setInterval(function(){
		var date = new Date().getTime();
		for(var use in global.queen_write)
		{
			if(global.queen_write[use]["time"] + 1000 * 60 * 5 < date)
			{
				global.queen_write[use]["res"] && global.queen_write[use]["res"].end("time out");
				delete global.queen_write[use];
			}
		}
	},1000 * 60 * 5);
})();

module.exports = connect;