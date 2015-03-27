(function($) {
  'use strict';

  var $document = $(document);

  var setClassName = function() {
    var $this = $(this),
        className = $this.find(':selected').attr('class') || "",
        data = $this.data('ftSelect') || {};
    
    if (className !== data.previousClass) {
      $this
        .addClass(className)
        .removeClass(data.previousClass)
        .data('ftSelect', $.merge({previousClass: className}, data));
    }
  };

  var setupSelectInputs = function(){
    $document
      .find('.select-input')
      .data('ftSelect', {previousClass: ""})
      .each(setClassName);
  };

  $document.on('change.ft.select', 'select:not([multiple])', setClassName);

  $document.on('DOMContentLoaded', function() {
    setupSelectInputs();
  });

  $document.on('setup.ft.select', function(){
    setupSelectInputs();
  });

  setTimeout(setupSelectInputs, 0);

})(jQuery);
