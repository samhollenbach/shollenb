function heightStyles(){
	$(".main-body").height($(".main-body").width() * 1.4);

	$("#img-cont").height($("#img-cont").width() * 1.2);

	$("#prof-img").height($("#img-cont").height());
	$("#prof-img").width($("#img-cont").width());

}


$(document).ready(function(){

	heightStyles();

	$( window ).resize(function() {
  		heightStyles();
	});



})


