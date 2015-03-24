(function($){
  'use strict';

  var itemActive = 'tabs-navigation__item--is-active',
      targetActive = 'tabs__target--is-active',
      tabItem = '.tabs-navigation__item[data-ft-tab]';

  var selectTab = function($element){
    var $target = $.ftGetTarget($element, 'ftTab'),
        $siblings, activeClass;

    $target.addClass(targetActive);
    $element.siblings().each(function(){
      var $this = $(this),
          $otherTarget = $.ftGetTarget($this, 'ftTab');
      
      $this.removeClass(itemActive);
      $otherTarget.removeClass(targetActive);
    });
    
    $element.addClass(itemActive);
  };

  $(document).on('select.ft.tab', tabItem, function(event){
    selectTab($(this));
  });

  $(document).on('click', tabItem, function(){
    $(this).trigger('select.ft.tab');
  });

})(jQuery);