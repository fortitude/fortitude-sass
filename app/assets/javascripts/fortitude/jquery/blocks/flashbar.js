(function($) {
    'use strict';

    $(document).
      on('close:ft:flashbar', '.flashbar', function() {
        $(this).remove();
      }).
      on('click.ft.flashbar.data-api', '.flashbar__close', function(event) {
        $(this).closest('.flashbar').trigger('close:ft:flashbar');
        event.preventDefault();
      });

})(jQuery);