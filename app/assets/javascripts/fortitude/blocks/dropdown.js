(function($){
  'use strict';

  $(document).on('open.ft.dropdown', '.dropdown', function(event){
    var $dropdown = $(this),
        dropdownIdentifier = $dropdown.data('ftDropdown');

    $dropdown.ftTransitionWith({
      dataAttr: 'ftShowClass',
      endEvent: 'opened.ft.dropdown'
    }).then(function(){
      $dropdown.prop('checked', true);
    });

    if(dropdownIdentifier){
      $('[data-ft-dropdown="' + dropdownIdentifier + '"]').each(function(){
        var $element = $(this);
        if(!$element.is($dropdown)){
          $element.trigger('close.ft.dropdown');
        }
      });
    }
  });

  $(document).on('close.ft.dropdown', '.dropdown', function(event){
    $(this).ftTransitionWith({
             dataAttr: 'ftHideClass'
           }).then(function(){
             $(this).find('.dropdown__toggle').prop('checked', false);
             $(this).trigger('closed.ft.dropdown');
           });
  });

  $(document).on('change', '.dropdown > .dropdown__toggle', function(event){
    var $this = $(this);
    if($this.is(':checked')){
      $(this).closest('.dropdown').trigger('open.ft.dropdown');
    } else {
      $(this).closest('.dropdown').trigger('close.ft.dropdown');
    }

  });

})(jQuery);
