(function($) {
  'use strict';

  $(document).on('open.ft.shade', '[ft-shade], [data-ft-shade]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-show',
      addClass: 'shade--is-active',
      endEvent: 'opened.ft.shade'
    });
  });

  $(document).on('close.ft.shade', '[ft-shade], [data-ft-shade]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-hide',
      removeClass: 'shade--is-active',
      endEvent: 'closed.ft.shade'
    });
  });

  $(document).on('click', '[ft-shade], [data-ft-shade], [ft-shade-close], [data-ft-shade-close]', function(event) {
    $(this).trigger('close.ft.shade');
  });

  $(document).on('click', '[ft-shade-open], [data-ft-shade-open]', function(event) {
    $('.shade').trigger('open.ft.shade');
  });

})(jQuery);
