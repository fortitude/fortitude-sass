(function($){
  'use strict';

  $(document).on('open.ft.dropdown', function(event){
    var $this = $(this),
        dropdownIdentifier = $this.data('ft-dropdown');

    $(document).find('[data-ft-dropdown="' + dropdownIdentifier + '"]').each(function(){
      var $element = $(this);
      if(!$element.is($this)){
        $element.trigger('close.ft.dropdown');
      }
    });
  });

  $(document).on('close.ft.dropdown', function(event){
    $(this).removeProp('checked');
  });
})(jQuery);