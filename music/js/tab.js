
function load(m){
	m=m||home;
	router(m,$(".container"));
}
load("home");
// $(".header").find("a").click(function(){
// 	console.log($(this))；
// 	$(".header").find("a").removeClass('active');
// 	$(this).addClass("active");
// });
$(".pop").click(function(){
load("home");
});
$(".rec").click(function(){
	$(".pop").removeClass("active");
	load("rec")
});
$(".order").click(function(){
	$(".pop").removeClass("active");
	load("order")
});
$(".hot").click(function(){
	$(".pop").removeClass("active");
	load("hot")
});

