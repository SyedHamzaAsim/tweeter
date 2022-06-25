$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    let remainder = 140 - $(this).val().length;
    $('.counter').text(remainder);
    if (remainder < 0) {
      $('.counter').addClass('turnRed');
    } else {
      $('.counter').removeClass('turnRed');
    }
  });
});