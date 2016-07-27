var express = require('express');
var router = express.Router();
var saveWinner = require("../modules/winner/saveWinner");
var get = require("../modules/winner/get");
var connect = require("../modules/game/connect");
var write = require("../modules/game/write");
var near = require("../modules/game/near");
var room = require("../modules/game/room");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/save', function(req, res, next) {
  	var username = req.param("username");
	var x = req.param("x");
	var y = req.param("y");
	if(!username || !x || !y)
	{
		return res.json({
			result : false,
			error : "Param Error"
		})
	}
	saveWinner(username, x, y, function(err, result){
		if(err)
		{
			return res.json({
				result : false,
				error : err
			});
		}
		else
			return res.json({
				result  :true,
				error : ""
			})
	});
});


router.use('/get', function(req, res, next) {
  get(function(err,result){
  	if(err)
  		return res.json({
				result : false,
				error : err
			});
  	else
  		return res.json(result);
  })
});

router.use('/game/connect',function(req, res, next){
	var x = req.param("x") || 0;
	var y = req.param("y") || 0;
	var username = req.param("username");
	connect(username, x, y, function(username){
		res.json({result:true,username : username});
	});
});

router.use('/game/write',function(req, res, next){
	var username = req.param("username");
	write(res, username);
});

router.use('/game/near',function(req, res, next){
	var x = req.param("x") || 0;
	var y = req.param("y") || 0;
	var username = req.param("username");
	res.json(near(username, x, y));
});

router.use('/game/begin',function(req, res, next){
	var username = req.param("users");
	room(username);
	res.json({result:1});
});

module.exports = router;
