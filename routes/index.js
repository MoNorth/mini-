var express = require('express');
var router = express.Router();
var saveWinner = require("../modules/winner/saveWinner");
var get = require("../modules/winner/get");
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


module.exports = router;
