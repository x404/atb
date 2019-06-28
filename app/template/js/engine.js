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
});


$(function(){
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.find('.input, .form-control, .submit, .btn-submit, textarea, input[type=radio], button').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, .btn-submit, textarea, input[type=radio], button').attr('disabled', true);
		}
	})
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


