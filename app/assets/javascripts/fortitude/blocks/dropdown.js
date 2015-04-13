(function($){
  'use strict';

  $(document).on('open.ft.dropdown', '[ft-dropdown], [data-ft-dropdown]', function(event){
    var $dropdown = $(this),
        dropdownIdentifier = $dropdown.attr('ft-dropdown') || $dropdown.attr('data-ft-dropdown');

    $dropdown.ftTransitionWith({
      attr: 'ft-show',
      endEvent: 'opened.ft.dropdown'
    }).then(function(){
      $dropdown.prop('checked', true);
    });

    if(dropdownIdentifier){
      $('[ft-dropdown="' + dropdownIdentifier + '"], [data-ft-dropdown="' + dropdownIdentifier + '"]').each(function(){
        var $element = $(this);
        if(!$element.is($dropdown)){
          $element.trigger('close.ft.dropdown');
        }
      });
    }
  });

  $(document).on('close.ft.dropdown', '[ft-dropdown], [data-ft-dropdown]', function(event){
    $(this).ftTransitionWith({
             attr: 'ft-hide'
           }).then(function(){
             $(this).find('[ft-dropdown-toggle], [data-ft-dropdown-toggle]').prop('checked', false);
             $(this).trigger('closed.ft.dropdown');
           });
  });

  var toggleClasses = [
    '[ft-dropdown] > [ft-dropdown-toggle]',
    '[data-ft-dropdown] > [data-ft-dropdown-toggle]',
    '[ft-dropdown] > [data-ft-dropdown-toggle]',
    '[data-ft-dropdown] > [ft-dropdown-toggle]'
  ].join(', ');

  $(document).on('change', toggleClasses, function(event){
    var $this = $(this);
    if($this.is(':checked')){
      $(this).closest('[ft-dropdown], [data-ft-dropdown]').trigger('open.ft.dropdown');
    } else {
      $(this).closest('[ft-dropdown], [data-ft-dropdown]').trigger('close.ft.dropdown');
    }
  });

})(jQuery);
