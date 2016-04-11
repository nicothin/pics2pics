/*!
 * jQuery Scrollie Plugin v1.0.1
 * https://github.com/Funsella/jquery-scrollie
 *
 * Copyright 2013 JP Nothard
 * Released under the MIT license
 */
!function(e,l){"use strict";function t(l,t){this.element=l,this.settings=e.extend({},i,t),this._defaults=i,this._name=s,this.init()}var s="scrollie",i={direction:"both",scrollOffset:0,speed:2,scrollingInView:null,ScrollingToTheTop:null,ScrollingOutOfView:null,scrolledOutOfView:null};t.prototype={init:function(){this._defineElements(),this._scrollEvent()},_defineElements:function(){var l=this;l.$scrollElement=e(l.element),l.$elemHeight=l.$scrollElement.outerHeight(),l.$elemPosTop=l.$scrollElement.offset().top,l.$scrollOffset=l.$scrollElement.data("scrollie-offset")||"0"==l.$scrollElement.data("scrollie-offset")?l.$scrollElement.data("scrollie-offset"):l.settings.scrollOffset,l.$scrollSpeed=l.$scrollElement.data("scrollie-speed")||"0"==l.$scrollElement.data("scrollie-speed")?l.$scrollElement.data("scrollie-speed"):l.settings.speed},_inMotion:function(e,l,t,s){var i=this,n=-1*(-1*(e-t)-l),o=-1*(e-t)/i.$scrollSpeed,c=n<l+i.$elemHeight,r=n>0-i.$scrollOffset,f=r&&l>n,u=r&&c,h=n>l-i.$scrollOffset&&c;f&&jQuery.isFunction(i.settings.ScrollingToTheTop)&&i.settings.ScrollingToTheTop.call(this,this.$scrollElement,i.$scrollOffset,s,n,o,t,e),u&&jQuery.isFunction(i.settings.scrollingInView)&&i.settings.scrollingInView.call(this,this.$scrollElement,i.$scrollOffset,s,n,o,t,e),h&&jQuery.isFunction(i.settings.ScrollingOutOfView)&&i.settings.ScrollingOutOfView.call(this,this.$scrollElement,i.$scrollOffset,s,n,o,t,e),c||jQuery.isFunction(i.settings.scrolledOutOfView)&&i.settings.scrolledOutOfView.call(this,this.$scrollElement,i.$scrollOffset,s,n,o,t,e)},_scrollEvent:function(){var t=this,s=t.settings.direction,i=0,n=!0;setInterval(function(){n=!0},66),e(l).on("scroll",function(){var l=e(this).scrollTop(),o=e(this).height(),c=l>i?"up":"down";c===s&&n===!0?(n=!1,t._inMotion(l,o,t.$elemPosTop,c)):"both"===s&&n===!0&&(n=!1,t._inMotion(l,o,t.$elemPosTop,c)),i=l})}},e.fn[s]=function(l){return this.each(function(){e.data(this,"plugin_"+s)||e.data(this,"plugin_"+s,new t(this,l))})}}(jQuery,window,document);



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
  $('#style-variant-1, #style-variant-2, #style-variant-3, #style-variant-4').owlCarousel({
    items: 1,
    // loop: true,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 500,
  });

  // Используем плагин для семны цвета фона страницы при прокрутке к определенным блокам
  var wHeight = $(window).height();
  $('.calculator__slider-vertical-item')
    .height(wHeight)
    .scrollie({
      scrollOffset : -150,
      scrollingInView : function(elem) {
        var bgColor = elem.data('bg-color');
        $('body').css('background-color', bgColor);
      }
    });

  // Следим за кликами на локальных ссылках и мотаем скролл плавно
  $('a[href^="#"]').on('click', function(){
    var targetPosition = $(this.hash).offset().top;            // целевая позиция скролла
    $('body,html').animate({'scrollTop':targetPosition},300);  // анимируем прокрутку
  });

  // Показываем или скрываем блок текста калькулятора
  function showHideCalculator() {
    var scrollPosition = $(document).scrollTop();
    var calcPosition = $('#calculator').offset().top;
    if(scrollPosition >= (calcPosition - 50)) {
      $('#style-selector').fadeIn();
    }
    else {
      $('#style-selector').fadeOut(50);
    }
  }

  // Следим за скроллом для показа и сокрытия текста калькулятора
  var t1;
  $(window).on('scroll', function(){
    clearTimeout(t1);
    t1 = setTimeout(function () {
      showHideCalculator();
    }, 100);
  });
  showHideCalculator();

  // Определим какую ссылку стиля подсвечивать
  var hash = window.location.hash;
  var styleLink = $('#calculator a[href="'+hash+'"]');
  console.log(styleLink);
  if(styleLink.length) {
    styleLink.closest('li').addClass('style-selector__style-item--active');
  }
  else {
    $('#styles li:first').addClass('style-selector__style-item--active');
  }

  // Следим за кликами на ссылках выбора стиля
  $('#styles a').on('click', function(){
    $('#styles a').closest('li').removeClass('style-selector__style-item--active');
    $(this).closest('li').addClass('style-selector__style-item--active');
    // промотка поисзойдет сама, выше есть слежение за локальными ссылками
  });

  // Следим за кликами на размерах холста
  $('#canvas-sizes li').on('click', function(){
    $('#canvas-sizes li').removeClass('style-selector__sizes-item--active');
    $(this).addClass('style-selector__sizes-item--active');
    $('#canvas-sizes-preview').height( $(this).data('y') ).width( $(this).data('x') );
  });

});
