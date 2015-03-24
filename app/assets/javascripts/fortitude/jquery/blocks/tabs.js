(function($){
  'use strict';

  $(document).on('select.ft.tabs', function(event){
    var activeClass = 'tabs-navigation__item--is-active',
        tabIdentifier = $this.data('ft-tabs'),
        $this = $(this);

    event.preventDefault();

    if($this.hasClass(activeClass)){
      $this.trigger('deselect.ft.tabs');
      $this.removeClass(activeClass);
    } else {
      $this.trigger('select.ft.tabs');
      $(document).find('[data-ft-tabs=' + tabIdentifier + ']').each(function(){
        $(this).trigger('deselect.ft.tabs');
        $(this).removeClass(activeClass);
      });
      $this.addClass(activeClass);
    }
    
    return false;
  });

  $(document).on('click', '[data-ft-tabs]', function(event){
    event.preventDefault();
    $(this).trigger('select.ft.tabs');
    return false;
  });

})(jQuery);