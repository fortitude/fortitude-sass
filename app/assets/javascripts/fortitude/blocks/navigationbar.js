(function($) {
  'use strict';

  $(document).on('change', '[ft-navigationbar-toggle], [data-ft-navigationbar-toggle]', function(){
    if($(this).prop('checked')){
      $('[ft-shade], [data-ft-shade]').trigger('open.ft.shade');
    } else {
      $('[ft-shade], [data-ft-shade]').trigger('close.ft.shade');
    }
  });
})(jQuery);
