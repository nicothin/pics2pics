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

  // Карусель с «фишками»
  $('#style-variant-1').owlCarousel({
    items: 1,
    // loop: true,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 500,
  });

});
