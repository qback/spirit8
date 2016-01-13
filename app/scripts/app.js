import svg4everybody from 'svg4everybody';
import 'swiper';



$(() => {
	var lastId,
		topMenu = $('#top-menu'),
		topMenuHeight = topMenu.outerHeight() + 15,
		menuItems = $('.nav__link');
	var scrollItems = menuItems.map(function () {
		var item = $($(this).attr('href'));
		if (item.length) {
			return item;
		}
	});

	// svg в ie
	svg4everybody();

	// вызов меню по кнопке для ширины < 768px
	var nav = $('.nav__menu'),
		navLink = $('#show-hide-menu');
	navLink.click(function () {
		$(this).toggleClass('nav__show-hide-menu_active');
		nav.toggleClass('nav__menu_open');
	});

	// плавная навигация к якорям
	menuItems.click(function (e) {
		var href = $(this).attr('href'),
		offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 1;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	// изменение классов у навигации и элементв навигации при скролле
	$(window).scroll(function () {
		var fromTop = $(this).scrollTop() + topMenuHeight;
		if (fromTop >= 120) {
			topMenu.addClass('nav_fixed');
		} else {
			topMenu.removeClass('nav_fixed');
		}
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
			});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';
		if (lastId !== id) {
			lastId = id;
			var filter = '[href="#' + id + '"]';
			menuItems.removeClass('nav__link_active').filter(filter).addClass('nav__link_active');
		}
	});


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
			400: {
				slidesPerView: 1,
				slidesPerGroup: 1
			},
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

	//скрыть плитку с портфолио по нажатию кнопки
	$('.work__button').click(function () {
		$('.masonry').toggleClass('masonry_hidden');
		$(this).text($(this).text() === 'Hide Portfolio' ? 'Show Portfolio' : 'Hide Portfolio');
	});

});


