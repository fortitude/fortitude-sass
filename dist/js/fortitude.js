
if (typeof jQuery === 'undefined') {
  throw new Error('Fortitude\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Fortitude\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

(function($) {
    'use strict';

    $(document).on('click.ft.flashbar.data-api', '.flashbar__close', function(event) {
      var $this = $(this);

      $this.closest('.flashbar').remove();

      event.preventDefault();

    });

})(jQuery);

(function($) {
    'use strict';
    // select placeholder polyfill
    $(document).on('change.ft.select.data-api', 'select:not([multiple])', function(event) {
      var $this = $(this),
          optionClassName = $this.find(':selected').attr('class'),
          lastOptionClassName = $this.data('lastOptionClassName');

      if (optionClassName !== lastOptionClassName) {
        $this.addClass(optionClassName);
        $this.removeClass(lastOptionClassName);
        $this.data('lastOptionClassName', optionClassName || '');
      }

      event.preventDefault();

    });

    setTimeout(function() {
      $(document).find('.select-input').trigger('change');
    }, 0);

})(jQuery);

(function($) {
  // zoom fix on input elements
  var $viewport = $('meta[name="viewport"]');
  $(document).on('focus blur', ':input', function(event) {
    $viewport.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type === 'focusout' || event.type === 'blur' ? 5 : 1));
  });
})(jQuery);
//= require_self
//= require_tree ./blocks
//= require_tree ./generic
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