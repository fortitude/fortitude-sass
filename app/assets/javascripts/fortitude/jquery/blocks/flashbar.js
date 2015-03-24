(function($) {
    'use strict';

    $(document).on('close.ft.flashbar', '.flashbar', function(event) {
      $(this).remove();
    });

    $(document).on('click', '.flashbar__close', function(event){
      $(this).closest('.flashbar').trigger('close.ft.flashbar');
    });

})(jQuery);