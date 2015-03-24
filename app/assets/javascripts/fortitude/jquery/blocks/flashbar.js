(function($) {
    'use strict';

    $(document).on('close.ft.flashbar', '.flashbar__close', function(event) {
      var $target = $(this).closest('.flashbar');
      event.preventDefault();
      $target.remove();
      return false;
    });

    $(document).on('click', '.flashbar__close', function(event){
      $(this).trigger('close.ft.flashbar');
    });

})(jQuery);