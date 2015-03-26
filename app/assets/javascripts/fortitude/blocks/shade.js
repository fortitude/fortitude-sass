(function($) {
  'use strict';

  $(document).on('open.ft.shade', '.shade', function(event) {
    $(this).ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: 'shade--is-active',
      endEvent: 'opened.ft.shade'
    });
  });

  $(document).on('close.ft.shade', '.shade', function(event) {
    $(this).ftTransitionWith({
      dataAttr: 'ftHideClass',
      removeClass: 'shade--is-active',
      endEvent: 'closed.ft.shade'
    });
  });

  $(document).on('click', '.shade', function(event) {
    $(this).trigger('close.ft.shade');
  });

  $(document).on('click', '[data-ft-shade]', function(event) {
    $('.shade').trigger('open.ft.shade');
  });

})(jQuery);
