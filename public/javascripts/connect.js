
var $connect = $('#connect');
var $text = $('#text');
var username = "";
var roomsUser = [];



function getConnect(pos){
	$.ajax({
		url : "game/connect",
		data : {
			x : pos.coords.latitude,
			y : pos.coords.longitude,
			username : username
		},
		success : function(data){
			username = data.username;
			$text.html("OK : " + data.username + " x : " + pos.coords.latitude + " y : " + pos.coords.longitude);
			
			// SSE
			var sse = new EventSource("/game/write?username=" + username);
			sse.addEventListener("message",function(e){
				console.log(e);
				var result = JSON.parse(e.data);
				if(result.close)
					return sse.close();
				$text.html($text.html() + "<br/>" + result.message);
			},false);
			sse.addEventListener("error",function(e){
				sse.close();
				// console.log(e);
				// $text.html($text.html() + "<br/>" + e.data);
			},false);


		},
		error : function(err){
			$text.html("err : " + err);
		}
	});


}

function getNear(pos){
	$.ajax({
		url : "game/near",
		data : {
			x : pos.coords.latitude,
			y : pos.coords.longitude,
			username : username
		},
		success : function(data){
			console.log(data);
			var html = "";
			data.map(function(user, index){
				html += "<li>"+ user +"</li>";
			});
			$("#nears").html(html);
		},
		error : function(err){
			$text.html("err : " + err);
		}
	});


}



$connect.click(function(){
	$text.html("click wait");
	if (navigator.geolocation) {  
	    navigator.geolocation.getCurrentPosition(
	    	getConnect
		    , function(err) {$text.html("error : " + err.message); console.log(err)}
		    , {});  
	} else {  
	  alert('抱歉！您的浏览器无法使用地位功能');  
	}
});

$("#near").click(function(){

	if (navigator.geolocation) {  
	    navigator.geolocation.getCurrentPosition(
	    	getNear
		    , function(err) {$text.html("error : " + err.message); console.log(err)}
		    , {});  
	} else {  
	  alert('抱歉！您的浏览器无法使用地位功能');  
	}
});


$("#nears").on("click","li",function(e){
	roomsUser.push($(this).html());
	$(this).css("color","red");
});

$("#begin").click(function(){
	$.ajax({
		url : "game/begin",
		data : {
			users : roomsUser.join(",")
		},
		success : function(data){
			console.log(data);
			// var html = "";
			// data.map(function(user, index){
			// 	html += "<li>"+ user +"</li>";
			// });
			// $("#nears").html(html);
		},
		error : function(err){
			$text.html("err : " + err);
		}
	});
});

