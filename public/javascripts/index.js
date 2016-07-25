
var datas = [
	{
		x : 22.546003,
		y : 113.941071
	},
	{
		x : 22.556003,
		y : 113.951071
	},
	{
		x : 22.536003,
		y : 113.931071
	},
	{
		x : 22.556003,
		y : 113.931071
	},
	{
		x : 22.526003,
		y : 113.911071
	},
	
	{
		x : 22.536003,
		y : 113.951071
	},
	{
		x : 22.536003,
		y : 113.931071
	},
	{
		x : 22.576003,
		y : 113.931071
	},
	{
		x : 22.576003,
		y : 113.971071
	},
	
	{
		x : 22.533003,
		y : 113.955071
	},
]


// // down按钮事件
// function downHandle(e){
	
// }


function init(){
	var map = new qq.maps.Map(document.getElementById('map'), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(22.546003,113.941071),
        zoom: 12
    });
	// new qq.maps.Marker({
	//         //设置Marker的位置坐标
	//         position: new qq.maps.LatLng(22.546003, 113.941071),
	//         //设置显示Marker的地图
	//         map: map,
	//         // animation: qq.maps.MarkerAnimation.BOUNCE,
	//         // icon: new qq.maps.MarkerImage("../images/" + index % 10 + ".png") 
	//     });
	// new qq.maps.Marker({
	//         //设置Marker的位置坐标
	//         position: new qq.maps.LatLng(20.546003, 113.941071),
	//         //设置显示Marker的地图
	//         map: map,
	//         // animation: qq.maps.MarkerAnimation.BOUNCE,
	//         // icon: new qq.maps.MarkerImage("../images/" + index % 10 + ".png") 
	//     });
	datas.map(function(data, index){
		new qq.maps.Marker({
	        //设置Marker的位置坐标
	        position: new qq.maps.LatLng(data.x, data.y),
	        //设置显示Marker的地图
	        map: map,
	        // animation: qq.maps.MarkerAnimation.BOUNCE,
	        icon: new qq.maps.MarkerImage("../images/" + index % 10 + ".png",
	        								 new qq.maps.Size(20,20))
	    })
	});
}


var pageID = function(){

	var domArr = [];
	var $pages = document.querySelectorAll(".page");
	var _pageTop = $pages[0].clientWidth < 768 ? 100 : 280; 
	for(var i = 0; i < $pages.length; i++)
	{
		var $ = {$ : $pages[i]};
		$.scorllTop = $pages[i].offsetTop - _pageTop;
		$.height = $pages[i].clientHeight + $.scorllTop;
		console.log($pages[i].clientHeight)
		$.L = $pages[i].querySelector(".left");
		$.R = $pages[i].querySelector(".right");
		domArr.push($);
	}
	return domArr;

}();

function leftAndRightAnimate(e){
	e = e || window.event;
	if (window.pageYOffset) {  
   		var scrollPos = window.pageYOffset; 
   	}  
    else if (document.compatMode && document.compatMode != 'BackCompat')  
    { 
    	var scrollPos = document.documentElement.scrollTop; 
    }  
    else
    {
    	var scrollPos = document.body.scrollTop;
    }
    // console.log(pageID);
	pageID.map(function($page, index){

		if(scrollPos > $page.scorllTop && scrollPos < $page.height)
		{
			//show
			if($page.L.style.marginLeft != '0x')
			{
				$page.L.style.marginLeft = '0px';
				$page.R.style.marginRight = '0px';
			}
		}else if($page.L.style.marginLeft != '-400px')
		{
	
			$page.L.style.marginLeft = '-600px';
			$page.R.style.marginRight = '-600px';
		}

	});
}

window.onload = init;
window.onscroll = leftAndRightAnimate;
