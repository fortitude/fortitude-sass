(function($) {
  'use strict';
  
  $(document).on('close.ft.flashbar', '.flashbar', function(event) {
    $(this).ftTransitionWith({
      dataAttr: 'ftHideClass',
      addClass: 'flashbar--closed',
      endEvent: 'closed.ft.flashbar'
    });
  });

  $(document).on('open.ft.flashbar', '.flashbar', function(event){
    $(this).ftTransitionWith({
      dataAttr: 'ftShowClass',
      removeClass: 'flashbar--closed',
      endEvent: 'opened.ft.flashbar'
    });
  });

  $(document).on('click', '.flashbar__close', function(event){
    $(this).closest('.flashbar').trigger('close.ft.flashbar');
  });

})(jQuery);