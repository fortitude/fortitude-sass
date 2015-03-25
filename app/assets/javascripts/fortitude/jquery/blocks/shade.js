(function($) {
  'use strict';
  
  $(document).on('open.ft.shade', '.shade', function(event) {
    var $this = $(this);
    $this.addClass('shade--is-active');
  });

  $(document).on('close.ft.shade', '.shade--is-active', function(event) {
    var $this = $(this);
    $this.removeClass('shade--is-active');
  });

  $(document).on('click', '.shade--is-active', function(event) {
    $(this).trigger('close.ft.shade');
  });

  $(document).on('click', '[data-ft-shade]', function(event) {
    $('.shade').trigger('open.ft.shade');
  });

})(jQuery);