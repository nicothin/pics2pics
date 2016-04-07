$(window).load(function(){

  // Инициализируем кастомный скролл
  $('#container').mCustomScrollbar({
    theme: 'dark-thick',
    autoHideScrollbar: true,
    mouseWheel:{ deltaFactor: 120 },
    callbacks:{
      // при любом скролле
      whileScrolling:function(){
        $("#mcs-top").text(this.mcs.top);

        // быстро получим высоту контента до калькулятора в этот момент
        var mainHeight = document.getElementById('main').offsetHeight;
        // если смещение сейчас уже больше или равно высоте контента до калькулятора
        if((this.mcs.top * -1) >= mainHeight) {
          $('#container')
            .mCustomScrollbar('stop') // останавливаем прокрутку
            .mCustomScrollbar("disable"); // отключаем прокрутку
          $('#mCSB_1_container').css('top',(mainHeight * -1)); // точно фиксируем положение прокручиваемого блока
        }
      }
    }
  });

  // Запустим видео, т.к. с этим плагином оно останавливается по непонятной пока причине
  $('video[autoplay]').each(function(i){
    $(this).trigger('play');
  });

});



$( document ).ready(function() {

  // показ/сокрытие стрелки на «первом экране»
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
  $('#carousel-demo').owlCarousel({
    items: 5,
    loop: true,
    nav: true,
    responsive : {
      1400 : {
        items: 6
      },
      1920 : {
        items: 7
      },
    }
  });

  // Клик по «ссылке» для промотки к галерее
  $('#to-gallery').on('click', function(){
    $('body').animate({scrollTop: $('#carousel-demo').offset().top }, 350);
  });

  // Галерея «второго экрана», инициализация лайтбокса
  $('[rel="gallery-demo"]').fancybox({
    openEffect  : 'none',
    closeEffect : 'none'
  });

  // Карусель с отзывами
  var carouselReviews = $('#carousel-reviews');
  carouselReviews.owlCarousel({
    items: 1,
    // loop: true,
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

  // Карусель с «фишками»
  $('#carousel-features').owlCarousel({
    items: 3,
    // loop: true,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 500,
  });

  // Отлавливаем скролл над слайдером стилей и перемещаем класс активности слайда в зависимости от направления кручения колеса мыши
  var t1,
      calculatorSlideInnerTransformY,
      windowHeight,
      calculator = $('#style-slider'),
      calculatorActiveSlide,
      calculatorNextActiveSlideIndex,
      calculatorNextActiveSlide
      calculatorItemNums = calculator.find('.calculator__slider-vertical-item').length;
  // calculator.on('wheel', function(event){
  //   if(calculator.hasClass('scrollInside')){
  //     clearTimeout(t1);
  //     t1 = setTimeout(function () {
  //       // получаем активный слайд
  //       calculatorActiveSlide = calculator.find('.calculator__slider-vertical-item--active');
  //       // если промотка вниз
  //       if(event.originalEvent.wheelDelta < 0) {
  //         // перемещаем класс активности
  //         calculatorNextActiveSlide = calculatorActiveSlide.next();
  //         if(calculatorNextActiveSlide.length) {
  //           calculatorActiveSlide.removeClass('calculator__slider-vertical-item--active');
  //           calculatorNextActiveSlide.addClass('calculator__slider-vertical-item--active');
  //         }
  //         // если стал активен последний слайд, включаем скролл
  //         if((calculatorNextActiveSlide.length && (calculatorNextActiveSlide.index() + 1) == calculatorItemNums) || !calculatorNextActiveSlide.length) {
  //           enableScroll();
  //           calculator.removeClass('scrollInside');
  //         }
  //       }
  //       // если промотка вверх
  //       else {
  //         // перемещаем класс активности
  //         calculatorNextActiveSlide = calculatorActiveSlide.prev();
  //         if(calculatorNextActiveSlide.length) {
  //           calculatorActiveSlide.removeClass('calculator__slider-vertical-item--active');
  //           calculatorNextActiveSlide.addClass('calculator__slider-vertical-item--active');
  //         }
  //         // если стал активен первый слайд, включаем скролл
  //         if((calculatorNextActiveSlide.length && calculatorNextActiveSlide.index() == 0) || !calculatorNextActiveSlide.length) {
  //           enableScroll();
  //           calculator.removeClass('scrollInside');
  //         }
  //       }
  //       showCurrentStyleSlider();
  //     }, 100);
  //   }
  // });

  // Сразу после загрузки прокручиваем слайдер стилей к нужной позиции
  showCurrentStyleSlider();

  // Функция прокрутки слайдера стилей к нужной позиции
  function showCurrentStyleSlider(){
    // Получим высоту вьюпорта сейчас
    windowHeight = parseInt($(window).height(), 10);
    // получим номер активного слайда
    calculatorNextActiveSlideIndex = parseInt(calculator.find('.calculator__slider-vertical-item--active').index(), 10);
    // перемещаем вложенный элемент слайдера так, чтобы видеть активный слайд
    calculator.find('.calculator__slider-vertical-inner').css('transform','translateY(-'+ (calculatorNextActiveSlideIndex * windowHeight) +'px)')
  }

  // Начинаем следить за скроллом страницы, дабы в некоторый момент (показ блока калькулятора) его блокировать и разблокировать
  // var lastScrollTop = 0;
  // $(window).on('scroll', function(event){
  //   var calculatorTop = calculator.offset().top + 1;
  //   var calculatorItemActiveIndex = $('.calculator__slider-vertical-item--active').index() + 1;
  //   var toTop = false;
  //   var st = $(this).scrollTop();
  //   // если это скролл вниз
  //   if (st > lastScrollTop){
  //     toTop = false; // флаг направления
  //   }
  //   // если это скролл вверх
  //   else {
  //     toTop = true; // флаг направления
  //   }
  //   lastScrollTop = st;
  //   // console.log((calculatorItemActiveIndex != calculatorItemNums));

  //   // если это скролл вниз, скролл уже близок к калькулятору и в калькуляторе активен не последний слайд
  //   if(!toTop && $(document).scrollTop() >= (calculatorTop) && (calculatorItemActiveIndex != calculatorItemNums)) {
  //     $('body').scrollTop(calculatorTop); // подравниваем скролл так, чтобы видеть блок калькулятора целиком
  //     disableScroll(); // отключаем скролл колесом и тачем (остается возможность скроллить стрелками с клавы)
  //     setTimeout(function() { calculator.addClass('scrollInside'); }, 600);
  //   }
  //   // если это скролл вверх, скролл уже близок к калькулятору и в калькуляторе активен не первый слайд
  //   if(toTop && $(document).scrollTop() <= (calculatorTop) && (calculatorItemActiveIndex != 1)) {
  //     $('body').scrollTop(calculatorTop); // подравниваем скролл так, чтобы видеть блок калькулятора целиком
  //     disableScroll(); // отключаем скролл колесом и тачем (остается возможность скроллить стрелками с клавы)
  //     setTimeout(function() { calculator.addClass('scrollInside'); }, 600);
  //   }
  // });

});
