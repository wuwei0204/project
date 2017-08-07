$(function(){
	window.onresize=function(){
	  var rootEle=document.documentElement;
	  var w=rootEle.clientWidth>1300?1300:rootEle.clientWidth;
	  rootEle.style.fontSize=w/7.5+"px";
	  console.log(w/7.5)
	};
})
	//获取路径参数---------------------------------------------------
	function getUrlParma(){
	 	var params={};
	 	var myurl;
		var url=window.location.href;
		//console.log(url);
		var url1=url.split("?");
		if(url1.length==2){
			myurl=url1[1];
		}else{
			return params;
		}

		var myarr=myurl.split("&");

		//console.log(myarr);
		for(var i=0;i<myarr.length;i++){
			var mydata=myarr[i].split("=");
			//console.log(mydata);
			params[mydata[0]]=mydata[1];//相当于params.id=0  ==  params[id]=0
		}

		return params
	}
	//getUrlParma();
	//获取模块名---------------------------------------------------------------------
	var m;
	function getM(){
		var url=window.location.href;
		var arr=url.split("#");
		if(arr.length<2){
			return false;
		};
		var p=arr[1].split("?");
		//console.log(p)
		p=p[0];
		//console.log(p)
		return p;
	}

//访问模块---------------------------------------------------------------------------------
	function router(m,container){
		container=container||$(".share")
		//请求模块结构------------------
		$.ajax({
			url:"view/"+m+".html",
			success:function(res){
				container.html(res)
				//console.log(res)
			}
		})
		//请求js文件-----------
		loadJs(m)
	}
	//引入设置的tab js文件-----------------------------
	function loadJs(m){
		$.ajax({
			url:"js/"+m+".js",
		})
	}

$(function(){
	m=getM();

	if(!localStorage.count){
		localStorage.count=0;
	}

	localStorage.count++;
	if(localStorage.count==1){
		router("hello",$("body"));
	}else{
		router("tab");
		router("audio",$(".global"))
	}


})