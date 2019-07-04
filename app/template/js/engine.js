var idCaptcha1, idCaptcha2;
var onloadReCaptchaInvisible = function() {
	idCaptcha1 = grecaptcha.render('recaptcha1', {
		"sitekey":"6LekqasUAAAAAEeSXL5E-tDlX2CVVp988nldHZJv",
		"callback": "onSubmitReCaptcha1",
		"size":"invisible"
	});
	idCaptcha2 = grecaptcha.render('recaptcha2', {
		"sitekey":"6LekqasUAAAAAEeSXL5E-tDlX2CVVp988nldHZJv",
		"callback": "onSubmitReCaptcha2",
		"size":"invisible"
	});
	idCaptcha3 = grecaptcha.render('recaptcha3', {
		"sitekey":"6LekqasUAAAAAEeSXL5E-tDlX2CVVp988nldHZJv",
		"callback": "onSubmitReCaptcha3",
		"size":"invisible"
	});
};

function onSubmitReCaptcha1(token) {
	var idForm = 'form-1';
	sendForm(document.getElementById(idForm), '/core/send.php', idCaptcha1, token);
}


function onSubmitReCaptcha2(token) {
	var idForm = 'form-2';
	sendForm(document.getElementById(idForm), '/core/send.php', idCaptcha2, token);
}

function onSubmitReCaptcha3(token) {
	var idForm = 'form-3';
	sendForm(document.getElementById(idForm), '/core/send.php', idCaptcha2, token);
}


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
			 grecaptcha.execute(idCaptcha1);
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
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};

			if (element.attr("name") == "tel"){
				element.closest('.input-field').addClass('error');
				error.insertAfter(element);
			};
		},
		submitHandler:function(form) {
			 grecaptcha.execute(idCaptcha2);
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
			 grecaptcha.execute(idCaptcha3);
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
			zoom: 11,
			controls: ['default', 'routeButtonControl']
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

		// Получим ссылку на элемент управления.
		control = myMap.controls.get('routeButtonControl');

		// Программно установим начальную точку маршрута.
		control.routePanel.state.set('to', 'г. Красноярск, ул. 78й Добровольческой Бригады, д. 1');
	});	
}



var thank = '<div class="thank"><p class="title">Заявка отправлена!</p><p>Спасибо, мы получили Вашу заявку и перезвоним Вам в течение рабочего дня.</p></div>';
var errorTxt = 'Форма не отправлена. Попробуйте позже.';




// подготовка данных формы
var prepareDataForm = function(form, captchaID, token) {
	// создаём экземпляр объекта FormData
	var formData = new FormData(form);
	// добавим ответ invisible reCaptcha
	formData.append('g-recaptcha-response', grecaptcha.getResponse(captchaID));
	formData.append("action", 'add_callback');
	formData.append("token", token);
	console.log(formData);
	return formData;
  }


//http://cccp-blog.com/koding/google-recaptcha-v3#moi-vpechatleniya-ot-google-recaptcha-v3
  // отправка формы через AJAX
  function sendForm(form, url, captchaID, token){
	var data = new FormData();
	let $table_url = 'https://docs.google.com/forms/d/e/1FAIpQLSfx9T7v7KRzyBAzMWIgXJ2JQ67Q5HHdYjdyWXoeDCWV_2sf5A/formResponse',
		formid = $(form).attr('id')

	$('.send-popup').append('<div class="sending"><p>Идет отправка ...</p></div>');

	modal2.open();
	fetch('/core/send.php', {
	    method: 'POST',
	    body: prepareDataForm(form, captchaID, token)
	}).then(function(response) {
		if (response.status == '200'){

			// отправка в google forms
			strSubmit = $(form).serialize();
			$.ajax({type: "POST",url: $table_url,data: strSubmit});

			if (formid == 'form-1' || formid == 'form-2'){
				$('.sending').remove();
				$('.send-popup').append(thank);
			};

			if (formid == 'form-3'){
				$('#qorder').modal('hide');
				$('.sending').remove();
				$('.send-popup').append(thank);
			}
		} else {
			alert(errorTxt);
			modal2.close();
		}
	});
  }




function sendform2(url, strSubmit, form){
	$('.send-popup').append('<div class="sending"><p>Идет отправка ...</p></div>');
	
	fetch('/core/send.php', {
		method: 'post',
		headers: {
			"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		body: strSubmit 
	})
	.then(function(response){ 
		let formid = $(form).attr('id');
		if (response.status == '200'){

			if (formid == 'form-1' || formid == 'form-2'){
				document.querySelector('.sending').remove();
				$('.send-popup').append(thank);
			};

			if (formid == 'form-3'){
				$('#qorder .modal-body').hide();
				$('#qorder .modal-content').append(thank);
			}

		} else {
			alert(errorTxt);
			modal2.close();
		}
	})
	.catch (function (error) {
		console.log('Request failed', error);
	});
}


document.querySelector('.send-popup .close-menu').addEventListener('click', function(e){
	e.preventDefault();
	modal2.close();
});

// popup on homepage
class Popup{
	constructor(name){
		this.name = name;
	}
	open(){
		// create overlay
		const newOverlay = document.createElement('div');
		newOverlay.className ='transparent-overlay';
		document.querySelector('body').appendChild(newOverlay);
		// show overlay
		document.querySelector('.transparent-overlay').addEventListener('click', function(){
			modal2.close();
		});

		// GENERAL EVENT - ONKEYDOWN
		document.onkeydown = function(evt) {
			evt = evt || window.event;
			let isEscape = false;
			if ("key" in evt) {
				isEscape = (evt.key == "Escape" || evt.key == "Esc");
			} else {
				isEscape = (evt.keyCode == 27);
			}
			if (isEscape) {
				modal2.close();
			}
		};

		// show popup

		document.querySelector(this.name).classList.add('show');
	}
	close(){
		document.querySelector('.transparent-overlay').remove();
		if (document.querySelectorAll('.thank').length > 0) document.querySelector('.thank').remove();
		// hide popup
		document.querySelector(this.name).classList.remove('show');
	}
}

var modal2 = new Popup('.send-popup');