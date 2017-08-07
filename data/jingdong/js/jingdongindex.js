// JavaScript Document
window.onload=function(){
//下拉菜单------------------------------------------
	var con=$('<ul class="add"><li><a href="##">菜单1</a></li><li><a href="##">菜单2</a></li><li><a href="##">菜单3</a></li></ul>');
	$('.la').append(con);	
	$('.la').each(function(){
		$(this).children('ul').hide();;
	});
	$('.la').hover(
		function(){
			$(this).children('ul').show();
			$(this).children('ul li').show();
		},
		function(){
			$(this).children('ul').hide();
		}
	);
//左边轮播------------------------------------------
	$('.tablist li').mouseenter(function(){
		var _this=this;
		var index=$(this).index();
		$(_this).addClass("ac").siblings().removeClass("ac");
		$('.tabitem').eq(index).css('display','block').siblings().css('display','none');
	});
	
	$('.tablist li').mouseleave(function(){
		$('.tablist li').removeClass("ac");
		$('.tabitem').css('display','none');
	})
	
//话费-----------------------------------------
	$('.move').mouseenter(function(){
		var _this=this;
		var index=$(this).index();
		$(_this).find('.wenzi a').addClass("service_frame_on");
		$(_this).siblings().find('.wenzi a').removeClass("service_frame_on");
		$('.service_pop').eq(index).addClass('service_expand').siblings().removeClass('service_expand');
	});
	$('.closeBtn').click(function(){
		$('.service_pop').removeClass('service_expand');
	});
//图片滑动------------------------------------------
	var lic=$("#piclist_move ul li").length;//获取图片的数量
	
	for(var i=0;i<lic;i++){
		$("ol").append('<li>'+(i+1)+'</li>')  
	}
	$("ol li:first").addClass("ac"); //给第一个加颜色
	function run(){
		$('#piclist_move ol li').mouseenter(function(){ //给下标绑定点击事件
			$(this).addClass('ac').siblings().removeClass('ac');//给点击的对象上颜色 其他兄弟去色
			var n=$(this).index();//找到点击下标对象
			$('#piclist_move ul li:eq('+n+')').show().siblings().hide();
		});
	}
	run();

//楼层滚动------------------------------------------

	$(window).scroll(function(){
		if($(window).scrollTop()>1500){
			$('.LocationFloorList,.topback').fadeIn();
		}else{
			$('.LocationFloorList,.topback').fadeOut();
		};
		
		
		$('.floor').each(function() {
			var st=$(window).scrollTop()+$(window).height()/2;
			var h=$(this).offset().top;
			if(h<st){
				var index=$(this).index();
				$('.LocationFloorList li').eq(index).addClass('ac').siblings().removeClass('ac');
			}
		});
	});
	
	$('.LocationFloorList li').click(function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		var index=$(this).index();
		//找到对应楼层的top值,让滚动条滚动到这个值
		var t=$('.floor').eq(index).offset().top;
		$('body,html').animate({"scrollTop":t});
	});

	$('.topback').click(function(){
		$('body,html').animate({"scrollTop":0});
			
	})
	
}
