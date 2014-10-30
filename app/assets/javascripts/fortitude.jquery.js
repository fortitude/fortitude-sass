(function($) {
  'use strict';

  var $viewport = $('meta[name="viewport"]');

  $(document).on('click.ft.flashbar.data-api', '.flashbar__close', function(event) {
    var $this = $(this);
    $this.closest('.flashbar').remove();
    event.preventDefault();
  });

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

  // zoom fix on input elements
  $(document).on('focus blur', ':input', function(event) {
    $viewport.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type === 'focusout' || event.type === 'blur' ? 5 : 1));
  });

})(jQuery);
