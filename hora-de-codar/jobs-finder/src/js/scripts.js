$(document).ready(function() {
  const btnMenuMobile = $('.btn-menumobile');

  $(btnMenuMobile).on('click', function() {
    $('.nav-container ul').toggleClass('open');
  })
});