$(document).ready(function(){
	
	//fancybox
	$('.fancy').fancybox();

	//bxslider
  	$('.bxslider').bxSlider({
  		//auto: true
  	});

  	$("#zoom").elevateZoom({
	  	zoomType  : "lens",
	  	scrollZoom : true,
	  	lensShape : "round",
	  	lensSize    : 361,
	  	borderColour : "#fff",
	  	borderSize : 10,
	  	cursor : "crosshair"
	});

	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    	$(this)
      		.addClass('active').siblings().removeClass('active')
      		.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  	});
});