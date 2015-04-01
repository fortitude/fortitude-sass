(function($) {
  'use strict';

  $(document).on('close.ft.flashbar', '[ft-flashbar], [data-ft-flashbar]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-hide',
      addClass: 'flashbar--closed',
      endEvent: 'closed.ft.flashbar'
    });
  });

  $(document).on('open.ft.flashbar', '[ft-flashbar], [data-ft-flashbar]', function(event){
    $(this).ftTransitionWith({
      attr: 'ft-show',
      removeClass: 'flashbar--closed',
      endEvent: 'opened.ft.flashbar'
    });
  });

  $(document).on('click', '[ft-flashbar-close], [data-ft-flashbar-close]', function(event){
    $(this).closest('[ft-flashbar], [data-ft-flashbar]').trigger('close.ft.flashbar');
  });

})(jQuery);
