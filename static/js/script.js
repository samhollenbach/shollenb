function heightStyles(){
	$(".main-body").height($(".main-body").width() * 1.0);

	$("#img-cont").height($("#img-cont").width() * 1.2);

	$("#prof-img").height($("#img-cont").height());
	$("#prof-img").width($("#img-cont").width());

}

function showPage(page){

	var i = pages.findIndex(p => p == page);

	if (i == curPageIndex){
		return
	}

	window.history.pushState("test", "test", "/" + page);

	var prevPage = $("#" + pages[curPageIndex] + "-block");
	var newPage = $("#" + pages[i] + "-block");
	
	$(".nav-links > a[name=" + pages[curPageIndex] + "]").css('border-color', 'transparent');
	$(".nav-links > a[name=" + pages[i] + "]").css('border-color', '#bfbfbf');

	var dir = 'right';
	if (i > curPageIndex){
		dir = 'left';
	}

	curPageIndex = i;

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
	}, {queue: false, duration: animDur});

}

var pages = ['profile', 'experience', 'projects', 'education'];
var curPageIndex = 0;	
var animDur = 500;
var startPageName = 'profile';

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

	$('.nav-links > a[name=' + startPageName + ']').css('border-color', '#bfbfbf');

	var startPage = $("#" + startPageName + "-block");
	startPage.css('opacity', '0');
	startPage.animate({
	    'opacity': 1
	}, {duration: 800, queue: false});


	$('.nav-links').animate({
		opacity: 1
	}, {duration: 800, queue: false});

	if (startPageName != 'profile'){
		showPage(startPageName);
	}

	$(document).on("click",".nav-links > a", function (e) {
		var n = e.target.name;
		showPage(n);
		
	});



})


