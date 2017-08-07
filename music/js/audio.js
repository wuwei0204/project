

var musicController={
 	server:"http://musicapi.duapp.com/api.php",
	play:function(music){
		$.ajax({
			type:"get",
			async:true,
			url:this.server+"?type=url&id="+music.id,
			success:function(res){
				console.log(res)
				// var list=JSON.stringify(res.playlists);
				// localStorage.list=list;
				// localStorage.cachetime=new Date().getTime();

				var $musicstate=$(".musicstate");
				$musicstate.html("歌曲加载成功");
				var audio=$(".audio").get(0);//将jq对象转为json对象
				audio.src=res.data[0].url;
				$(".btn").removeClass('playimg').addClass("playimg");
				audio.play();
				function isPlay(){
					$(".btn").click(function(){
						if($(this).hasClass("playimg")){
							$(this).removeClass('playimg').addClass("pauseimg");
							audio.pause();
						}else{
							$(this).removeClass('pauseimg').addClass("playimg");
							audio.play();
						}
					});
				}
				isPlay();
			}

		});
		
		var $musicstate=$(".musicstate");
			$musicstate.html("歌曲正在加载");

	}
}

