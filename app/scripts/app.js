import svg4everybody from 'svg4everybody';
import 'swiper';


$(() => {

	//svg в ie
	svg4everybody();

	//вызов меню по кнопке для ширины < 768px
	$(function(){
		var nav = $('.nav__menu'),
			navLink = $('#show-hide-menu');
		navLink.click(function () {
			$(this).toggleClass('nav__show-hide-menu_active');
			nav.toggleClass('nav__menu_open');
		});
	});

	// плавная анимация при скроллинге к секциям
	$('.nav__link, .about__button').on('click', function () {
		var scrollAnchor = $(this).attr('data-scroll'),
			scrollPoint = $('[data-anchor="' + scrollAnchor + '"]').offset().top;
		$('body,html').animate({
			scrollTop: scrollPoint
		}, 500);
		return false;
	});

	// переключение классов у ссылок навигации при скроллинге
	$(window).scroll(function () {
		var windscroll = $(window).scrollTop();
		if (windscroll >= 95) {
			var $anchors = $('[data-anchor]');
			$('.nav').addClass('nav_fixed');
			$anchors.each(function (i) {
				var $this = $(this);
				// для блока contact специальное условие из-за маленького футера
				if ((($this.data('anchor') === 'contact') && ($this.position().top <= windscroll + 100)) || ($this.position().top <= windscroll + 80)) {
					$('.nav__link').removeClass('nav__link_active');
					$('.nav__link').eq(i).addClass('nav__link_active');
				}
			});
		} else {
			$('.nav').removeClass('nav_fixed');
			$('.nav__link').removeClass('nav__link_active');
			$('.nav__link:first').addClass('nav__link_active');
		}
	}).scroll();


	// подключение слайдера для блока team
	var teamSwiper = new Swiper('.team__container', {
		pagination: '.team__container-pagination',
		paginationClickable: true,
		slidesPerView: 4,
		spaceBetween: 28,
		slideClass: 'team__item',
		wrapperClass: 'team__container-wrapper',
		bulletClass: 'team__pagination-bullet',
		bulletActiveClass: 'team__pagination-bullet_active',
		breakpoints: {
			500: {
				slidesPerView: 1,
				spaceBetweenSlides: 30
			},
			768: {
				slidesPerView: 2,
				spaceBetweenSlides: 20
			},
			1024: {
				slidesPerView: 3,
				spaceBetweenSlides: 30
			}
		}
	});

	//подключение слайдера в блоке clients
	var clientsSwiper = new Swiper('.clients__container', {
		pagination: '.clients__container-pagination',
		paginationClickable: true,
		slidesPerView: 5,
		slidesPerGroup: 5,
		spaceBetween: 30,
		slideClass: 'clients__item',
		wrapperClass: 'clients__container-wrapper',
		bulletClass: 'clients__pagination-bullet',
		bulletActiveClass: 'clients__pagination-bullet_active',
		breakpoints: {
			600: {
				slidesPerView: 2,
				slidesPerGroup: 2
			},
			750: {
				slidesPerView: 3,
				slidesPerGroup: 3
			},
			1024: {
				slidesPerView: 4,
				slidesPerGroup: 4
			}
		}
	});

	//подключение слайдера в блоке testimonial (автопрокрутка)
	var testimonialSwiper = new Swiper('.testimonial__container', {
		pagination: '.testimonial__container-pagination',
		paginationClickable: true,
		effect: 'fade',
		fade: {crossFade: true},
		autoplay: 5000,
		speed: 1000,
		slideClass: 'testimonial__item',
		wrapperClass: 'testimonial__container-wrapper',
		bulletClass: 'testimonial__pagination-bullet',
		bulletActiveClass: 'testimonial__pagination-bullet_active',
		autoplayDisableOnInteraction: false
	});

	//параметры подключения фильтра в блоке work
	$('.masonry__container').isotope({
		itemSelector: '.figure',
		layoutMode: 'masonry',
		masonry: {
			gutter: 30,
			columnWidth: '.grid-sizer',
			isFitWidth: true
		}
	});

	//изменение классов у переключателей фильтра, настройка анимации фильтра
	$('.masonry__filter-item').click(function () {
		var $this = $(this);
		var selector = $this.attr('data-filter');
		$('.masonry__filter-item').removeClass('masonry__filter-item_active');
		$this.addClass('masonry__filter-item_active');
		$('.masonry__container').isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
		return false;
	});

});


