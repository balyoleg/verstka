$(document).ready(function(){

	//bxslider
	if($('.bxslider').length){
	  	$('.bxslider').bxSlider({
	  		auto: true
	  	});
	}

	if($('.slider-pol-ob').length){
	  	$('.slider-pol-ob').bxSlider({
	  		//auto: true
	  		pagerCustom: '#bx-pager'
	  	});
	}	

	// Fancybox
	jQuery(".fancy").fancybox();

  	/* hover main menu delayed */
  	var delay=350, setTimeoutConst;

  	$('.main-menu-rigth>ul>li').hover(
    	function () {
	      		var ths = $(this);
	      		setTimeoutConst = setTimeout(function(){
	        	ths.addClass('view');
	        	ths.closest('#menu').find('.sub').slideUp(0);
	        	ths.find('.sub').css('z-index', 5000).slideDown(0);
	      	}, delay);
	    },
	    function () {
	      	var ths = $(this);
	      	ths.removeClass('view');
	      	setTimeout(function() {
	        	if (!ths.hasClass('view')) {
	          		ths.find('.sub').css('z-index', 1000).slideUp(0);
	        	}
	    	},500);
	      	clearTimeout(setTimeoutConst );
	    }
  	);

  	// Табы на jquery
  	$('ul.tabs').each(function() {  
    	$(this).find('li').each(function(i) {  
      		$(this).click(function(){  
        	$(this).addClass('current').siblings().removeClass('current')  
          		.parents('div.section').find('div.box').eq(i).fadeIn(150).siblings('div.box').hide();  
      		});  
    	});  
  	});

// Кастомизация checkbox и radio
  	$('.radio-box input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});

	$('.check-box input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});

	$('.service-ob-row input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});

// Меню-акардеон в сайдбаре
    if($('.menu-akkardeon ul').length){
        $('.menu-akkardeon ul').dcAccordion();   
    }

}); //end document ready
