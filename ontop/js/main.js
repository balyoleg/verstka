$(document).ready(function(){

	//bxslider
  	$('.bxslider').bxSlider({
  		//auto: true
  	});

  	// Кастомизация checkbox и radio
  	$('.radio-box input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal',
		increaseArea: '20%'
	});

	// Валидация
	// Form action
  	var fields = ["name", "phone", "email"]; // обязательные поля
  	var locked = false;
  	var $form = $('#order-form'); // какую форму проверяем

  	$form.submit(function(){
  		console.log('клик');
    	var error = 0; // флаг заполнения обязательных полей
    	var errorCheck = 0; // флаг подтверждения
    	var formSubmit = true;
    	$form.find(":input").each(function(){ // проходимся в цикле по всем полям формы
      		for(var i = 0; i < fields.length; i++){ // проходимся по массиву обязательных полей
        		if($(this).attr("name") == fields[i]){ // если проверяемое поле есть в списке обязательных
          			if( !$.trim($(this).val()) ){ // если поле не заполнено
            			$(this).addClass("error");
            			formSubmit = false;
            			error = 1;
          			}else{
            			// если заполнено - убираем красную рамку
            			$(this).removeClass("error");
          			}
        		}
      		}
    	});

    	if(error == 0){
	      	// если ошибок нет - отправляем форму
	        $.ajax({
		        url: "/ajax/order.php",
		        type: "POST",
		        data: $(this).serializeArray(),
		        dataType: "html", 
		        complete: function(responce) {
		         // console.log(responce)
		          	if (responce.status==200){
		              	$(':input')
		                  	.removeAttr('checked')
		                  	.removeAttr('selected')
		                  	.not(':button, :submit, :reset, :hidden, :radio, :checkbox')
		                  	.val('');
		            	alert("Спасибо! мы с вами свяжемся.");
		          	}else{
		             	alert("Что-то не работает! Перезвоните нам");
		          	}
		        }
		    });
	        return false;
    	} else {
	        // если что-то не заполнено
	        var err_text = "";
	        if(error) err_text += "Пожалуйста заполните обязательные поля!";
	        $("#messenger").hide().fadeIn(500).html(err_text);
	        return false;
      	}
    });

}); //end document ready

