(function($){
  'use strict';

  var itemActive = 'tabs-navigation__item--is-active',
      targetActive = 'tabs__target--is-active',
      tabItem = '.tabs-navigation__item[data-ft-tab]';

  var selectTab = function($element){
    var $target = $.ftGetTarget($element, 'ftTab'),
        $siblings, activeClass;

    $element.siblings().each(function(){
      var $this = $(this),
          $otherTarget = $.ftGetTarget($this, 'ftTab');

      $this.ftTransitionWith({
        dataAttr: 'ftHideClass',
        removeClass: itemActive,
        endEvent: 'deselected.ft.tab'
      });

      $otherTarget.ftTransitionWith({
        dataAttr: 'ftHideClass',
        removeClass: targetActive,
        endEvent: 'closed.ft.tabtarget'
      });
    });

    $element.ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: itemActive,
      endEvent: 'opened.ft.tab'
    });

    return $target.ftTransitionWith({
      dataAttr: 'ftShowClass',
      addClass: targetActive,
      endEvent: 'opened.ft.tabtarget'
    });
  };

  $(document).on('select.ft.tab', tabItem, function(event){
    selectTab($(this));
  });

  $(document).on('click', tabItem, function(){
    $(this).trigger('select.ft.tab');
  });

})(jQuery);
