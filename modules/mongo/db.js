var mongoose = require("mongoose");

var options = {  
		server: {
			auto_reconnect: true,
			poolSize: 5
		}
	};

mongoose.connect('mongodb://127.0.0.1:27017/mini', options, function(err, res){
	if(err)
		console.log(err);
});

var db = mongoose.connection;

var mongooseSchema = new mongoose.Schema({
	username : {type: String},
	x : {type: String},
	y : {type: String},
	time : {type: String}
});

var mongooseModel = db.model('mini', mongooseSchema);

var add = function(doc, callback){
	mongooseModel.create(doc, function(error){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log('save ' + doc.username);
	    }
	    if(callback)
	    	callback(error);
	    // db.close();
	});
};

var getAll = function(callback){
	mongooseModel.find({},{x : 1, y : 1, _id : 0},callback);
}




exports.add = add;
exports.getAll = getAll;