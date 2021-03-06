
jQuery( document ).ready(function($) {

  // // показ/сокрытие стрелки на «первом экране»
  var t0;
  $(window).on('scroll', function(){
    clearTimeout(t0);
    t0 = setTimeout(function () {
      if($(document).scrollTop() > 100) {
        $('.first-screen__to-bottom').fadeOut(150);
      }
      else {
        $('.first-screen__to-bottom').fadeIn(150);
      }
    }, 100);
  });

  // Карусель с демками картин
  $('#gallery').owlCarousel({
    items: 3,
    autoWidth: true,
    center: true,
    loop: true,
    nav: true,
    // mouseDrag: false,
    // touchDrag: false,
    margin: 1,
    // responsive : {
    //   1400 : {
    //     items: 6
    //   },
    //   1920 : {
    //     items: 7
    //   },
    // }
  });

  // Карусель с отзывами
  var carouselReviews = $('#carousel-reviews');
  carouselReviews.owlCarousel({
    items: 1,
    stagePadding: 110,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 500,
    onTranslate: changeBegin
  });

  // Добавим предыдущему и следующему слайдам классы
  $('#carousel-reviews .active').prev().addClass('prev');
  $('#carousel-reviews .active').next().addClass('next');

  // По факту смены слайда перемещаем классы для предыдущего и следующего
  function changeBegin(event) {
    $('#carousel-reviews .next').removeClass('next');
    $('#carousel-reviews .prev').removeClass('prev');
    $('#carousel-reviews .owl-item').eq(event.item.index + 1).addClass('next');
    $('#carousel-reviews .owl-item').eq(event.item.index - 1).addClass('prev');
  }

  // Следим за кликами на аватарах непоказанных слайдов, меняем слайды
  $(document).on('click', '.owl-item.next .reviews__item-avatar', function(){
    carouselReviews.trigger('next.owl.carousel');
  });
  $(document).on('click', '.owl-item.prev .reviews__item-avatar', function(){
    carouselReviews.trigger('prev.owl.carousel');
  });

  // Клики по пагинаторам слайдеров стилей
  // $('#calculator .owl-dot').on('click', function(){
  //   console.log('ddd');
  //   $('body,html').animate({'scrollTop':$(this).closest('.calculator__slider-vertical-item').offset().top},100);
  // });

  // Карусель с «фишками»
  // $('#style-variant-1, #style-variant-2, #style-variant-3, #style-variant-4').owlCarousel({
  //   items: 1,
  //   nav: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   smartSpeed: 500,
  //   onChange: function(event){
  //     $('body,html').animate({'scrollTop':$(event.target).closest('.calculator__slider-vertical-item').offset().top},200);
  //   }
  // });

  // Используем плагин для смены цвета фона страницы при прокрутке к определенным блокам
  // и для переключения подсвеченного пункта в калькуляторе стиля
  // var wHeight = $(window).height();
  // $('.calculator__slider-vertical-item')
  //   .height(wHeight)
  //   .scrollie({
  //     scrollOffset : -150,
  //     scrollingInView : function(elem, offset, direction, coords, scrollRatio, thisTop, winPos) {
  //       var bgColor = elem.data('bg-color');
  //       $('body').css('background-color', bgColor);
  //       // $('#styles li').removeClass('style-selector__style-item--active');
  //       // $('#styles a[href$="'+elem.attr('id')+'"]').closest('li').addClass('style-selector__style-item--active');
  //     }
  //   });

  // Следим за кликами на локальных ссылках и мотаем скролл плавно
  // $('a[href^="#"]').on('click', function(){
  //   var targetPosition = $(this.hash).offset().top;            // целевая позиция скролла
  //   $('body,html').animate({'scrollTop':targetPosition},300);  // анимируем прокрутку
  //   // $(window).scroll();
  // });

  $('#to-quickly').on('click', function(e){
    e.preventDefault();
    var targetPosition = $(this.hash).offset().top + ($(this.hash).height() / 2) - ($(window).height() / 2);
    $('body,html').animate({'scrollTop':targetPosition},300);
  });

  $('#shown-add-reviews').on('click', function(e){
    e.preventDefault();
    $('#add-reviews').addClass('add-reviews--shown');
  });
  $('.add-reviews__close').on('click', function(){
    $('#add-reviews').removeClass('add-reviews--shown');
  });

  $('.js-local-link').on('click', function(e){
    e.preventDefault();
    var targetPosition = $(this.hash).offset().top;
    $('body,html').animate({'scrollTop':targetPosition},300);
  });

  // Функция показа или сокрытия блока текста калькулятора
  // function showHideCalculator() {
  //   // только если не показана форма
  //   if( !$('#style-form').hasClass('style-form calculator__style-form--show') && $('#calculator').length ) {
  //     var scrollPosition = $(document).scrollTop();
  //     var calcPosition = $('#calculator').offset().top;
  //     if(scrollPosition >= (calcPosition - 300)) {
  //       $('#style-selector').addClass('calculator__style-selector--shown');
  //     }
  //     else {
  //       $('#style-selector').removeClass('calculator__style-selector--shown');
  //     }
  //   }
  // }

  // Следим за скроллом для показа и сокрытия текста калькулятора
  // var t1;
  // $(window).on('scroll', function(){
  //   clearTimeout(t1);
  //   t1 = setTimeout(function () {
  //     showHideCalculator();
  //   }, 20);
  // });
  // showHideCalculator();

  // Своя реализация подсветки номера
  // var t2;
  // var styleNum = $('.calculator__slider-vertical-item').length;
  // var calcItemHeight = $('#calculator').height() / styleNum;
  // var calcActiveSlideIndex;
  // $(window).on('scroll', function(){
  //   clearTimeout(t2);
  //   t2 = setTimeout(function () {
  //     var scrollPosition = $(document).scrollTop();
  //     var calcPosition = $('#calculator').offset().top - 1; // -1px поправки
  //     if(scrollPosition > calcPosition) {
  //       calcActiveSlideIndex = Math.abs(Math.round((scrollPosition - calcPosition) / calcItemHeight - 0.2) ); // 0.2 — коэффициент поправки
  //       if (calcActiveSlideIndex > (styleNum - 1)) {
  //         calcActiveSlideIndex = styleNum - 1;
  //       }
  //     }
  //     else {
  //       calcActiveSlideIndex = 0;
  //     }
  //     // console.log(calcActiveSlideIndex); // индексный номер слайда, занимающего сейчас экран
  //     $('#styles li').removeClass('style-selector__style-item--active').eq(calcActiveSlideIndex).addClass('style-selector__style-item--active');
  //     var bgColor = $('.calculator__slider-vertical-item').eq(calcActiveSlideIndex).data('bg-color');
  //     $('body').css('background-color', bgColor);
  //     // console.log(bgColor);
  //   }, 50);
  // });

  // Определим какую ссылку стиля подсвечивать
  // var hash = window.location.hash;
  // var styleLink = $('#calculator a[href="'+hash+'"]');
  // if(styleLink.length) {
  //   styleLink.closest('li').addClass('style-selector__style-item--active');
  // }
  // else {
  //   $('#styles li:first').addClass('style-selector__style-item--active');
  // }

  // Следим за кликами на ссылках выбора стиля
  // $('#styles a').on('click', function(){
  //   $('#styles li').removeClass('style-selector__style-item--active');
  //   $(this).closest('li').addClass('style-selector__style-item--active');
  //   // промотка поизойдёт сама, выше есть слежение за локальными ссылками
  // });

  // Следим за кликами на размерах холста
  // $('#canvas-sizes li').on('click', function(){
  //   $('#canvas-sizes li').removeClass('style-selector__sizes-item--active');
  //   $(this).addClass('style-selector__sizes-item--active');
  //   $('#canvas-sizes-preview').height( $(this).data('y') ).width( $(this).data('x') );
  // });

  // Показ и сокрытие формы
  // $('#style-form-show').on('click', function(){
  //   $('#style-form').addClass('calculator__style-form--show');
  //   $('#style-selector').removeClass('calculator__style-selector--shown');
  // });
  // $('#style-form-hide').on('click', function(){
  //   $('#style-form').removeClass('calculator__style-form--show');
  //   showHideCalculator();
  // });

  // Галерея «второго экрана», инициализация лайтбокса
  $('[rel="gallery-demo"]').fancybox({
    // openEffect  : 'none',
    // closeEffect : 'none',
    helpers : {
      overlay : {
        css : {
          'background' : 'rgba(58, 42, 45, 0.3)'
        }
      }
    }
  });

});
