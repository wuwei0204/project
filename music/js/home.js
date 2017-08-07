
var server = "http://musicapi.duapp.com/api.php";
function getPlaylist(limit,callback){
	if(isCache()){
		//console.log("访问缓存");
		//将本地缓存字符串转为json对象

		var data=JSON.parse(localStorage.list);
		callback(data)
	}else{
		$.ajax({
			type:"get",
			url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
			//url:"api/topPlayList.json",
			async:true,
			success:function(res){
				//console.log("访问网络")
				//console.log(res.playlists)
				//将json对象转为字符串本地缓存
				var list=JSON.stringify(res.playlists);
				localStorage.list=list;
				localStorage.cachetime=new Date().getTime();
				//console.log(localStorage.cachetime);
				// var data=JSON.parse(localStorage.list);

				// callback(data)
				callback(res.playlists)
			}
		})
	}
//判断缓存是否存在---------------------------------------
	function isCache(){
		//缓存不存在 返回false
		if(!localStorage.list){
			return false;
		}
		//判断缓存时间是否炒过30秒
		if(new Date().getTime()-localStorage.cachetime>=30*1000){
			return false;
		}
		return true;
	}


};

getPlaylist(12,function(data){
	//console.log(data);
	var $songlist=$(".songlist");

	var template=$(".template").html();

	//console.log($template);
	for(var i=0;i<data.length;i++){
		var $item=$(template);
		//console.log($item);
		$item.find("a").attr("href","#datail?id="+data[i].id);
		$item.find(".num").html(data[i].playCount);
		$item.find("img").attr("src",data[i].coverImgUrl);
		if(!data[i].coverImgUrl){
				$item.find("img").attr("src","img/2.jpg");

		}
		$item.find(".des").html(data[i].name);

		$item.appendTo($songlist)
	}

})
var mySwiper = new Swiper ('.swiper-container', {
    //direction: 'vertical',
    loop: true,
    autoplay: 2000,
    // 如果需要分页器
    pagination: '.swiper-pagination',

    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    // 如果需要滚动条

  })
