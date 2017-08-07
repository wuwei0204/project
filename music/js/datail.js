$(".title").click(function(){
	router("tab");
	//router("audio",$(".global"));
});
var data=getUrlParma();
//console.log(data.id)
 var server = "http://musicapi.duapp.com/api.php";
function getMusiclist(id,callback){
	//获取数据------------------------------------------------
	$.ajax({
			type:"get",
			url:"https://api.imjad.cn/cloudmusic?type=playlist&id="+id,
			//url:"api/playlist.json",
			async:true,
			success:function(res){
				//console.log("访问网络")
				var data=res.playlist.tracks;
				console.log(res)
				var $tit=$(".tit");
				//var list=JSON.stringify(res.playlists);
				//localStorage.list=list;
				//localStorage.cachetime=new Date().getTime();
				//console.log(localStorage.cachetime);
				// var data=JSON.parse(localStorage.list);
				$tit.find("img").attr("src",res.playlist.creator.avatarUrl);
				$tit.find(".num").html(res.playlist.playCount);
				$tit.find(".con").html(res.playlist.name);
				$tit.find(".author").html(res.playlist.creator.nickname);

				callback(data)
				//callback(res.playlists)
			}
		})
};
//获取播放清单-----------------------------------------------
getMusiclist(data.id,function(data){
	//console.log(data);
	var $musiclist=$(".musiclist");
	var listtemplate=$(".listtemplate").html();
	var $play=$(".play");
	$play.find("span").html("共计"+data.length+"首")
	//console.log(listtemplate);
	for(var i=0;i<data.length;i++){
		var $item=$(listtemplate);
		var music=data[i];
		//console.log(music);
		$item.find(".singer").html(music.ar[0].name);
		$item.find(".music").html(music.name);
		if(isCollected(music.id)){
			$item.find("span").removeClass().addClass('red')
		}else{
			$item.find("span").removeClass().addClass('no')
		}
		$item.appendTo($musiclist);
	// 点击收藏-------------------------------------------------
		$item.find("span").data("music",music).click(function(e){

			var music=$(this).data("music");
			//console.log($(this).data("music").id)
			if(localStorage.collection){
				var list=JSON.parse(localStorage.collection);
				console.log("已经收藏啦");
				if(isCollected(music.id)){
					list[music.id].isCollected=false;
					$(this).removeClass().addClass("no")
				}else{
					list[music.id]={name:music.name,singer:music.ar[0].name,isCollected:true};
					$(this).removeClass().addClass('red');
				}
			}else{
				console.log("第一次收藏");
				 localStorage.collection={};
				var list=localStorage.collection;
				list[music.id]={name:music.name,singer:music.ar[0].name,isCollected:true};
				$(this).removeClass().addClass('red');

			}
			localStorage.collection=JSON.stringify(list);

			return false;
		});
//点击播放音乐---------------------------------
		$item.data("music",music).click(function(){
			var m=$(this).data("music");
			if(!m&&!m.al.picUrl){
				console.log("不存在");
				return false;
			}else{
				console.log(m);
				musicController.play(m);
				var $musicname=$(".musicname");
				$musicname.find("img").attr("src",m.al.picUrl);
				$musicname.find("span").html(m.name);
				$(".btn").removeClass("pauseimg").addClass("playimg");
			}

		})
	}
})
//判断是否被收藏------------------
function isCollected(id){
	if(localStorage.collection){
		var list=JSON.parse(localStorage.collection);
	}else{
		return false;
	}
	if(list[id]&&list[id].isCollected){
		return true;
	}else{
		return false;
	}
}
