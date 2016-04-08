$(window).load(function(){

  // Инициализируем кастомный скролл
  var t1;
  var container = $('#container');
  var styleSliderActiveSlide;
  var styleSliderActiveSlideNew;
  var styleSlider = $('#style-slider');
  var styleSliderPos = 0;
  var styleSliderCurrentPos;
  var toDown;

  $('#container').mCustomScrollbar({
    theme: 'dark-thick',
    autoHideScrollbar: true,
    mouseWheel:{ deltaFactor: 120 },
    callbacks:{

      // при любом «скролле»
      whileScrolling: function(){
        // проверим направление, поставим/снимем флаг
        styleSliderCurrentPos = this.mcs.top * -1;
        if(styleSliderPos < styleSliderCurrentPos) {
          // console.log('down');
          toDown = true;
        }
        else {
          // console.log('up');
          toDown = false;
        }

        // быстро получим высоту контента до калькулятора в этот момент
        var mainHeight = document.getElementById('main').offsetHeight;

        // если «крутили» вниз
        if(toDown) {
          if(
           ((this.mcs.top * -1) >= mainHeight) // смещение сейчас уже больше или равно высоте контента до калькулятора
           &&
           styleSlider.find('.calculator__slider-vertical-item--active').next().length // показан не последний «слайд» калькулятора
          ) {
            showCalculator();
          }
        }

        // если «крутили» вверх
        else {

          if(
            ((this.mcs.top * -1) <= mainHeight) // смещение сейчас уже меньше или равно высоте контента до калькулятора
            &&
            styleSlider.find('.calculator__slider-vertical-item--active').prev().length // показан не первый «слайд» калькулятора
          ) {
            showCalculator();
          }
        }

        // если нужно «застопорить скролл»
        function showCalculator() {
          // отключаем прокрутку
          container.mCustomScrollbar('disable');
          // выравниваем калькулятор, чтобы занимал весь экран (он 100vh в высоту)
          $('#mCSB_1_container').css('top',(mainHeight * -1));

          setTimeout(styleSliderFunctions, 800);
          function styleSliderFunctions() {
            styleSlider.on('wheel', function(event){
              clearTimeout(t1);
              t1 = setTimeout(function () {

                // найдем активный слайд
                styleSliderActiveSlide = styleSlider.find('.calculator__slider-vertical-item--active');

                // если колесом мотали вниз
                if(event.originalEvent.wheelDelta < 0 || event.originalEvent.deltaY > 0) {
                  // console.log('down');
                  styleSliderActiveSlideNew = styleSliderActiveSlide.next();
                  // если следующий слайд есть (сейчас активен не последний)
                  if(styleSliderActiveSlideNew.length) {
                    styleSliderActiveSlide.removeClass('calculator__slider-vertical-item--active');
                    styleSliderActiveSlideNew.addClass('calculator__slider-vertical-item--active');
                  }
                  // активен последний, нужно обратно включить кастомный скролл
                  else {
                    $('#container').mCustomScrollbar("update");
                    $('#style-slider').off('wheel');
                  }
                }

                // если колесом мотали вверх
                else {
                  // console.log('up');
                  styleSliderActiveSlideNew = styleSliderActiveSlide.prev();
                  // если предыдущий слайд есть (сейчас активен не первый)
                  if(styleSliderActiveSlideNew.length) {
                    styleSliderActiveSlide.removeClass('calculator__slider-vertical-item--active');
                    styleSliderActiveSlideNew.addClass('calculator__slider-vertical-item--active');
                  }
                  // активен первый, нужно обратно включить кастомный скролл
                  else {
                    $('#container').mCustomScrollbar("update");
                    $('#style-slider').off('wheel');
                  }
                }

                // «промотаем» слайдер
                showCurrentStyleSlider();

              }, 100);
            });
          }

        }

      },

      // по окончании «скролла»
      onScroll: function(){
        // пишем в переменную последнюю позицию (нужно для проверки направления)
        styleSliderPos = this.mcs.top * -1;
      },

    }
  });

  // Запустим видео, т.к. с этим плагином оно останавливается по непонятной пока причине
  $('video[autoplay]').each(function(i){
    $(this).trigger('play');
  });

  // Сразу после загрузки прокручиваем слайдер стилей к нужной позиции
  showCurrentStyleSlider();

  // Функция прокрутки слайдера стилей к нужной позиции
  function showCurrentStyleSlider(){
    // Получим высоту вьюпорта сейчас
    var windowHeight = parseInt($(window).height(), 10);
    // получим номер активного слайда
    var styleSliderNextActiveSlideIndex = parseInt(styleSlider.find('.calculator__slider-vertical-item--active').index(), 10);
    // перемещаем вложенный элемент слайдера так, чтобы видеть активный слайд
    styleSlider.find('.calculator__slider-vertical-inner').css('transform','translateY(-'+ (styleSliderNextActiveSlideIndex * windowHeight) +'px)');
    // меняем фоновый цвет
    styleSlider.css('background-color', styleSlider.find('.calculator__slider-vertical-item--active').data('bg-color'));
  }

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

});
