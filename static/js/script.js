var pages = ['profile', 'experience', 'projects', 'education'];
var curPageIndex = 0;	
var animDur = 500;
var startPageName = 'profile';


function heightStyles(){



	$("#img-cont").height($("#img-cont").width() * 1.3);

	$("#prof-img").height($("#img-cont").height());
	$("#prof-img").width($("#img-cont").width());

	var h = $(".page-cont:visible").height();
	$(".main-body").height(h);
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

	
	newPage.css('marginLeft', marginEnd);
	newPage.css('opacity', 0);
	newPage.show();
	
	prevPage.animate({
	    'margin-left': '-=' + marginEnd + 'px',
	    'opacity': 0
	}, {queue: false, duration: animDur}, function() {
		prevPage.css('opacity', 1);	
		prevPage.css('marginLeft', moL);
		prevPage.css('display', 'none');

	});
	
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


