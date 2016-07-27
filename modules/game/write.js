


function write (res, username) {
	res.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });
	if(!global.queen_write[username])
		return res.end('data: {"close": '+ "true" +'}\n\n');
	res.sendToSSE = function(data){
		res.write('data: {"message": '+ JSON.stringify(data) +'}\n\n');
	}
	res.sendToSSE("hello");
	global.queen_write[username].res = res;
}

module.exports = write;