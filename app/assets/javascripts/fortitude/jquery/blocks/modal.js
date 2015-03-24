(function($) {
    'use strict';

    $(document).on('open.ft.modal', function(event) {
      
      var $this = $(this);
      var $target = $($this.data('ft-modal'));

      $.screenLock(true);
      $('.shade').trigger('open.ft.shade');
      $('.container--fixed-top').css({
        paddingRight: $.measureScrollBar
      });

      $target.show().addClass('fadeIn').waitForAnimation().then( function(){
        $target
          .removeClass('fadeIn')
          .trigger('opened.ft.modal')
          .attr('data-ft-modal-open', true);
      });

      return false;
    });

    $(document).on('close.ft.modal', function(event) {
      var $this = $(this);
      
      event.preventDefault();
      $.screenLock(false);

      $this
        .addClass('fadeOut')
        .data('ft-modal-open', false)
        .waitForAnimation()
        .then(function(){
          $.screenLock(false);
          $('.container--fixed-top').css({
            paddingRight: $.measureScrollBar
          });
          $this
            .hide()
            .removeClass('fadeOut')
            .trigger('closed.ft.modal');
        });

      return false;
    });

    $(document).on('click', '[data-ft-modal]', function(){
      $(this).trigger('open.ft.modal');
    });

    $(document).on('click', '[data-ft-modal-close]', function(){
      $(this).trigger('close.ft.modal');
    });

    $(document).on('click', '.shade', function(){
      $('[data-ft-modal-open=true]').trigger('close.ft.modal');
    });

})(jQuery);
