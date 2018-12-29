var pages = ['profile', 'experience', 'music', 'baseball', 'contact'];
var curPageIndex = 0;	
var animDur = 500;
var startPageName = 'profile';

var minBodyHeight = 500;


function heightStyles(){

	var h = $("#img-cont").width() * 1.3;
	$("#img-cont").height(h);

	$("#prof-img").height(h);
	$("#prof-img").width($("#img-cont").width());

	bodyHeight();
}

function bodyHeight(){
	var h = $("#" + pages[curPageIndex] + '-block').height();

	var wh = $(window).height();

	$('#bg').height(wh);

	minBodyHeight = wh * 0.7;

	if (h < minBodyHeight){
		h = minBodyHeight;
	}

	$(".main-body").animate({
		'height': h
	}, {queue: false, duration: 100});
}


function showPage(page){

	var i = pages.findIndex(p => p == page);

	if (i == curPageIndex){
		return
	}

	window.history.pushState("test", "test", "/" + page);

	var prevPage = $("#" + pages[curPageIndex] + "-block");
	var newPage = $("#" + pages[i] + "-block");
	
	$(".nav-links > .flex > a[name=" + pages[curPageIndex] + "]").css('border-color', 'transparent');
	$(".nav-links > .flex > a[name=" + pages[i] + "]").css('border-color', '#bfbfbf');

	var PAGE_WIDTH = $(window).width();
	var PAGE_HEIGHT = $(window).height();

	var moL = prevPage.css('marginLeft');

	var marginEnd = PAGE_WIDTH;

	if (i < curPageIndex){
		marginEnd *= -1;
	}
	curPageIndex = i;

	
	newPage.stop();
	prevPage.stop();

	newPage.css('marginLeft', marginEnd);
	newPage.css('opacity', 0);
	newPage.show();

	bodyHeight();

	
	prevPage.animate({
	    'margin-left': '-=' + marginEnd + 'px',
	    'opacity': 0
	}, {queue: false, duration: animDur, complete: function() {
		prevPage.css('opacity', 1);	
		prevPage.css('marginLeft', moL);
		prevPage.css('display', 'none');
		
	}});
	
	newPage.animate({
	    'margin-left': '0px',
	    'opacity': 1.0
	}, {queue: false, duration: animDur});
}



function setStartPage(page){
	startPageName = page;
}

$(document).ready(function(){

	heightStyles();

	$( window ).resize(function() {
  		heightStyles();
	});

	if (startPageName == null){
		startPageName = 'profile';
	}else if (pages.indexOf(startPageName) == -1){
		return
	}

	$('.nav-links > .flex > a[name=' + startPageName + ']').css('border-color', '#bfbfbf');

	var startPage = $("#" + startPageName + "-block");
	startPage.css('opacity', '0');
	startPage.animate({
	    'opacity': 1
	}, {duration: 800, queue: false});


	$('.nav-links').animate({
		opacity: 1
	}, {duration: 800, queue: false});

	$('.footer').animate({
		opacity: 1
	}, {duration: 800, queue: false});

	if (startPageName != 'profile'){
		showPage(startPageName);
	}

	$(document).on("click",".nav-links > .flex > a", function (e) {
		var n = e.target.name;
		showPage(n);
		
	});


	$(document).on("click",".bio2 > p > a", function (e) {
		var n = e.target.name;
		showPage(n);
		
	});

})


