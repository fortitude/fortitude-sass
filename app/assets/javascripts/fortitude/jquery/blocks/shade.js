(function($) {
  'use strict';
  
  $(document).on('open.ft.shade', '.shade', function(event) {
    var $this = $(this);
    $this.removeClass('shade')
         .addClass('shade--is-active');
  });

  $(document).on('close.ft.shade', '.shade--is-active', function(event) {
    var $this = $(this);
    $this.removeClass('shade--is-active')
         .addClass('shade');
  });

  $(document).on('click', '.shade--is-active', function(event) {
    event.preventDefault();
    $(this).trigger('close.ft.shade');
    return false;
  });

  $(document).on('click', '[data-ft-shade]', function(event) {
    event.preventDefault();
    $('.shade').trigger('open.ft.shade');
    return false;
  });

})(jQuery);