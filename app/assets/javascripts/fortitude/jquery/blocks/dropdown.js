(function($){
  'use strict';

  $(document).on('open.ft.dropdown', '.dropdown[data-ft-dropdown]', function(event){
    var $dropdown = $(this),
        dropdownIdentifier = $dropdown.data('ftDropdown');
    
    $('[data-ft-dropdown="' + dropdownIdentifier + '"]').each(function(){
      var $element = $(this);
      if(!$element.is($dropdown)){
        $element.trigger('close.ft.dropdown');
      }
    });
  });

  $(document).on('close.ft.dropdown', '.dropdown', function(event){
    $(this).find('.dropdown__toggle').attr('checked', false);
  });

  $(document).on('click', '[data-ft-dropdown] > .dropdown__toggle', function(event){
    $(this).closest('.dropdown').trigger('open.ft.dropdown');
  });

})(jQuery);