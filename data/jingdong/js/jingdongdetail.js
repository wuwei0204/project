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
	
	//切换图片------------------------------------------
	$("#nowPic li").mouseenter(function(){
		var _this=this;
		$(_this).addClass("ac").siblings().removeClass("ac")
		$("#magnify img").attr("src",$(this).find("img").attr("src"));
	});
	//选取型号------------------------------------------
	var flag;
	$("#changeSize li").hover(
		function(){
			flag=$(this).hasClass("size_ac");
			if (!flag) {
				$(this).addClass("size_ac");
			};
		} ,
		function(){
			if (!flag) {
				$(this).removeClass("size_ac");
			};
		}
	);
	$("#changeSize li").click(function(){
		$(this).addClass("size_ac").siblings().removeClass("size_ac");
		flag=true;
		var data=$(this).attr("data-size");
		$("#nowPic img").each(function(){
			if( $(this).attr("data-size")==data ){
				$(this).parent().parent().addClass("ac").siblings().removeClass("ac");
				$("#magnify img").attr("src",$(this).attr("src") );
			}
		});
	});
	//切换------------------------------------------
	$("#changeRecommend li").click(function(){
		var index=$(this).index();
		$(this).addClass("ac").siblings().removeClass("ac");
		$("#changeRecommend .tab_box").eq(index).show().siblings().hide();
	}).hover();
	$("#addProduct button").click(function(ev){
		var input=$(this).siblings("input");
		var oElm=ev.target;
		if ( oElm.className=="add_btn" ) {
			input.val( parseInt( input.val() )+1 );
		}else if(oElm.className=="sub_btn" ){
			input.val( parseInt( input.val() )-1 );
				if(parseInt(input.val())<=1){
				input.val("1");	
			}
	}
	});
	//放大镜------------------------------------------
	function magnify(obj){
		obj.append("<span></span>");	
		var html=$('<div class="magnify_big"><img class="bigImg" src="'+$("#magnify img").prop("src")+'" /></div>')
		obj.append(html);
		obj.mouseenter(function(ev){
			$("#magnify span").show();
			$(".magnify_big").show();
			$(this).mousemove(function(ev){
				var offset=$(this).offset();
				var spanW=$("#magnify span").width();
				var spanH=$("#magnify span").height();
				var objW=obj.width();
				var objH=obj.height();
				var bigpW=$(".magnify_big").width();
				var bigpH=$(".magnify_big").height();
				//计算缩放比例
				var scaleL=spanW/bigpW;
				var scaleH=spanH/bigpH;
				//计算大图的尺寸
				$(".magnify_big img").css({"width":bigpW/scaleL, "height":bigpH/scaleH});
				//阴影距离盒子的位置  
				l=ev.pageX-offset.left-spanW/2;	
				h=ev.pageY-offset.top-spanH/2;
				// 可以移动的最大距离
				maxL=objW-spanW;	
				maxH=objH-spanH;
				//console.log(h,maxH)
				if (l<0) {
					l=0;
				}else if (l>maxL) {
					l=maxL;
				}
				if (h<0) {
					h=0;
				}else if (h>maxH) {
					h=maxH;
				}
				$("#magnify span").css({"left":l,"top":h});
				//计算div2的图片移动
				l=l/scaleL;
				h=h/scaleH;
				$(".magnify_big img").css({"left":-l, "top": -h});
			})
		})
		obj.mouseleave(function(){
			$("#magnify span,.magnify_big").hide();
		});
	}
	magnify($("#magnify"));
	$('.submit_num').click(function(){
		alert('添加成功！')	
	})
}
