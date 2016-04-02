$( document ).ready(function() {

  // показ/сокрытие белой херовины со стрелкой на «первом экране»
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
  });

});
