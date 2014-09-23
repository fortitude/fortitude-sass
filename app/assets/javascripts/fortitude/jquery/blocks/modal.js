(function($) {
  'use strict';

  $(document).on('click', '[data-open-modal]', function(event) {
    event.preventDefault();
    var $this = $(this);
    var $target = $($this.data('open-modal'));

    $target.trigger('open:ft:modal');

    $.screenLock(true);
    $('.shade').trigger('open:ft:shade');
    $('.container--fixed-top').css({paddingRight: $.measureScrollBar});

    $target.show().addClass('fadeIn').waitForAnimation().then( function(){
      $target.removeClass('fadeIn').trigger('opened:ft:modal').attr('data-modal-open', true);
    });

    return false;
  });

  $(document).on('click', '[data-close-modal]', function(event) {
    event.preventDefault();
    var $this = $(this);
    var $target = $('[data-modal-open=true]');

    $target.trigger('close:ft:modal');
    $.screenLock(false);
    $('.shade').trigger('close:ft:shade');

    $target.addClass('fadeOut').data('modal-open', false).waitForAnimation().then(function(){
      $.screenLock(false);
      $('.container--fixed-top').css({paddingRight: $.measureScrollBar});
      $target.hide().removeClass('fadeOut').trigger('closed:ft:modal');
    });

    return false;
  });

})(jQuery);