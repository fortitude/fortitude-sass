(function($){
  'use strict';

  $.fn.waitForAnimation = function(){
    var deferred = $.Deferred(),
        $this = $(this),
        existing = $this.data('ft-waiting');


    if(existing){
      existing.reject('Added second animation wait.');
    }

    $this.data('ft-waiting', deferred);

    $this.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      deferred.resolveWith($this);
    });

    $this.one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
      deferred.resolveWith($this);
    });

    return deferred.promise();
  };

})(jQuery);
