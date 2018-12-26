function heightStyles(){
	$(".main-body").height($(".main-body").width() * 1.4);

	$("#img-cont").height($("#img-cont").width() * 1.2);

	$("#prof-img").height($("#img-cont").height());
	$("#prof-img").width($("#img-cont").width());

}


var pages = ['profile', 'experience', 'education', 'projects'];
var curPageIndex = 0;	
var animDur = 500;

function showPage(prevPage, newPage, dir){

	var PAGE_WIDTH = $(window).width();
	var PAGE_HEIGHT = $(window).height();

	var moL = prevPage.css('marginLeft');

	var marginEnd = PAGE_WIDTH;

	if (dir == 'right'){
		marginEnd *= -1;
	}

	
	newPage.css('marginLeft', marginEnd);
	newPage.css('opacity', 0);
	newPage.show();
	

	prevPage.animate({
	    'margin-left': '-=' + marginEnd + 'px',
	    'opacity': 0
	}, {queue: false, duration: animDur}, function() {
		prevPage.hide();
		prevPage.css('opacity', 1);	
		prevPage.css('marginLeft', moL);

	});
	
	newPage.animate({
	    'margin-left': '0px',
	    'opacity': 1.0
	}, {queue: false, duration: animDur}, function() {
		//newPage.show();
		//newPage.css('opacity', 100);	
		//newPage.css('marginLeft', moL);

	} );

    	
}

$(document).ready(function(){

	heightStyles();

	$( window ).resize(function() {
  		heightStyles();
	});


	$('.nav-links > a[name=profile]').css('text-decoration', 'underline');
	var startPage = $("#profile-block");
	startPage.css('opacity', '0');
	startPage.animate({
	    'opacity': 1
	}, {duration: 800, queue: false});


	$('.nav-links').animate({
		opacity: 1
	}, {duration: 800, queue: false});


	$(document).on("click",".nav-links > a", function (e) {

		var n = e.target.name;
		var i = pages.findIndex(p => p == n);

		if (i == curPageIndex){
			return
		}

		var oldPage = $("#" + pages[curPageIndex] + "-block");
		var newPage = $("#" + pages[i] + "-block");

		
		$(".nav-links > a[name=" + pages[curPageIndex] + "]").css('text-decoration', 'none');
		$(".nav-links > a[name=" + pages[i] + "]").css('text-decoration', 'underline');

		var dir = 'right';
		if (i > curPageIndex){
			dir = 'left';
		}

		curPageIndex = i;

		showPage(oldPage, newPage, dir);
		
	});



})


