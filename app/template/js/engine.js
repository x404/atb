$(document).ready(function(){
	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				$('body').addClass('o-menu');

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
			};
		init();
	});	



	// inputs
	$('.input-field').each(function(){
		if ($(this).find('.form-control').val().length > 0) {
			return $(this).addClass('is-charged');
		}
	});

	$('body').on('focusin', '.input-field', function(e) {
		return $(this).addClass('is-focused');
	})
	.on('focusout', '.input-field', function(e) {
		$(this).removeClass('is-focused');
		return $(this).removeClass('is-focused');
	})
	.on('change', '.input-field', function() {
		$(this).removeClass('is-charged');
		if ($(this).find('.form-control').val().length > 0) {
			return $(this).addClass('is-charged');
		}
	});


		// mask
	$('input.tel').inputmask({
		mask: '+7(999)999-99-99',
		showMaskOnHover : false
	});

	$('#navbar a, .popup-menu a').click(function () {
		elementClick = $(this).attr('href');
		destination = $(elementClick).offset().top;
		$('body, html').animate({scrollTop: destination }, 800);
	});

	$('.to-price').click(function () {
		destination = $('#section-9').offset().top;
		$('body, html').animate({scrollTop: destination }, 800);
	});	


	// validate
	$.validator.addMethod("validphone", function(value){
		if (Inputmask.isValid(value, { mask: '+7(999)999-99-99'})) return true
		else return false;
	},"");
		


	// validate
	$('#form-1 input, #form-2 input, #form-3 input').click(function(){
		let $this = $(this);
		$this.closest('form').find('label.error').remove();
		$this.closest('.input-field').removeClass('error');
	});

	$('#form-1').validate({
		rules: {
			name:{
				required : true
			},
			tel: {
				validphone:true
			}
		},
		messages:{
			name: "Поле не заполнено",
			tel: {
				required: "Поле не заполнено"
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "name"){
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};

			if (element.attr("name") == "tel"){
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};
		},
		submitHandler:function(form) {
			let strSubmit= $(form).serialize(),
				url = $(form).attr('action');
			sendform(url, strSubmit, form);
		}
	});	

	$('#form-2').validate({
		rules: {
			name:{
				required : true
			},
			tel: {
				validphone:true
			}
		},
		messages:{
			name: "Поле не заполнено",
			tel: {
				required: "Поле не заполнено"
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "name"){
				console.log(element);
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};

			if (element.attr("name") == "tel"){
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};
		},
		submitHandler:function(form) {
			let strSubmit= $(form).serialize(),
				url = $(form).attr('action');
			sendform(url, strSubmit, form);
		}
	});	

	$('#form-3').validate({
		rules: {
			name:{
				required : true
			},
			tel: {
				validphone:true
			}
		},
		messages:{
			name: "Поле не заполнено",
			tel: {
				required: "Поле не заполнено"
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "name"){
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};

			if (element.attr("name") == "tel"){
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};
		},
		submitHandler:function(form) {
			let strSubmit= $(form).serialize(),
				url = $(form).attr('action');
			sendform(url, strSubmit, form);
		}
	});	
});


document.querySelector('.extra-toggle').addEventListener('click', function(){
	document.querySelector('body').classList.toggle('o-popup-menu')
});
document.querySelector('.popup-menu .close-menu').addEventListener('click', function(){
	document.querySelector('body').classList.toggle('o-popup-menu')
});


function init(){
	/******* =Yandex MAP ********/
	//http://api.yandex.ru/maps/jsbox/2.1/placemark_shape
	//http://api.yandex.ru/maps/jsbox/2.1/placemark_balloon
	//http://api.yandex.ru/maps/jsbox/2.1/icon_customImage
	ymaps.ready(function() {
		var myMap = new ymaps.Map('map', {
			center: [56.037413, 92.917646],
			zoom: 11
		}),
		myPlacemark = new ymaps.Placemark(
			[56.037413, 92.917646],
			{
				hintContent: 'ATB-сервис',
				balloonContent: 'ул. 78й Добровольческой Бригады, д. 1'
			}, 
			{
				// http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
				// preset: 'islands#darkGreenDotIcon'
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: '/template/images/balloon.png',
				// Размеры метки.
				iconImageSize: [51, 60],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-3, -42]
			},{
		});
		myMap.geoObjects.add(myPlacemark);
	});	
}




var thank = '<div class="thank text-center"><p>Форма отправлена!</p><p>В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей</p></div>';
var errorTxt = 'Форма не отправлена. Попробуйте позже.';

function sendform(url, strSubmit, form){
	$(form).find('fieldset').hide();
	$(form).append('<div class="sending">Идет отправка ...</div>');
	
	fetch('/core/send.php', {
		method: 'post',
		headers: {
	        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		body: strSubmit 
	})
	.then(function(response){ 
		if (response.status == '200'){
			document.querySelector('.sending').remove();
			$(form).append(thank);
			// startClock($(form));
		} else{
			alert(errorTxt);
			$(form).find('fieldset').show();
			$('.sending').remove();	
		}
	})
	.catch (function (error) {
	    console.log('Request failed', error);
	});
}