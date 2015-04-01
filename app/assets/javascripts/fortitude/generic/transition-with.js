(function($){
  'use strict';

  $.fn.ftTransitionWith = function(opts){
    opts = opts || {};

    var $this = $(this),
        deferred = $.Deferred(),
        endEvent = opts.endEvent,
        addClass = opts.addClass,
        removeClass = opts.removeClass,
        attr = opts.attr,
        callback = opts.callback,
        existing = $this.data('ftTransitionWith'),
        transitionClass;

    if(existing) {
      existing.reject('Initiated another ftTransitionWith');
    }

    transitionClass = $this.attr(attr);
    if(!transitionClass){
      transitionClass = $this.attr('data-' + attr);
    }

    if(transitionClass){
      $this.addClass(transitionClass + ' ' + addClass)
           .waitForAnimation()
           .then(function(){
             if(deferred.state() !== 'rejected'){
               $this.removeClass(transitionClass);
               if(addClass)    { $this.addClass(addClass); }
               if(removeClass) { $this.removeClass(removeClass); }
               if(endEvent)    { $this.trigger(endEvent); }
               deferred.resolveWith($this);
             }
           });

      deferred.fail(function(){
        $this.removeClass(transitionClass);
      });

    } else {

      // 1ms timeout so we can keep the promise interface
      setTimeout(function(){
        if(deferred.state() !== 'rejected'){
          if(addClass)    { $this.addClass(addClass); }
          if(removeClass) { $this.removeClass(removeClass); }
          if(endEvent)    { $this.trigger(endEvent); }
          deferred.resolveWith($this);
        }
      }, 1);
    }

    $this.data('ftTransitionWith', deferred);
    return deferred.promise();
  };

})(jQuery);
