
function room (ohther) {
	var users = ohther.split(',');
	var userinfo = {};
	users.map(function(u,i){
		userinfo[u] = global.queen_write[u];
		global.queen_write[u] = {};
		delete global.queen_write[u];
		console.log(userinfo[u].x);
		userinfo[u].res.sendToSSE("Game Begin");
	});
}

module.exports = room;