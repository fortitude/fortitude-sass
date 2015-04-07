(function($){
  'use strict';

  var itemActive = 'tabs-navigation__item--is-active',
      targetActive = 'tabs__target--is-active',
      tabItem = '[ft-tab], [data-ft-tab]';

  var selectTab = function($element){
    var $target = $.ftGetTarget($element, 'ft-tab'),
        $siblings, activeClass;

    $element.siblings().each(function(){
      var $this = $(this),
          $otherTarget = $.ftGetTarget($this, 'ft-tab');

      $this.ftTransitionWith({
        attr: 'ft-hide',
        removeClass: itemActive,
        endEvent: 'deselected.ft.tab'
      });

      $otherTarget.ftTransitionWith({
        attr: 'ft-hide',
        removeClass: targetActive,
        endEvent: 'closed.ft.tabtarget'
      });
    });

    $element.ftTransitionWith({
      attr: 'ft-show',
      addClass: itemActive,
      endEvent: 'opened.ft.tab'
    });

    return $target.ftTransitionWith({
      attr: 'ft-show',
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
