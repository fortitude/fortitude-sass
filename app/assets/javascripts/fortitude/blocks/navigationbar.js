(function($) {
  'use strict';

  $(document).on('change', '.navigationbar__toggle__helper', function(){
    if($(this).prop('checked')){
      $('.shade').trigger('open.ft.shade');
    } else {
      $('.shade').trigger('close.ft.shade');
    }
  });
})(jQuery);
