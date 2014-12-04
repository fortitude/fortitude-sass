(function($) {
  'use strict';

  var $document = $(document);

  var setClassName = function() {
    var $this = $(this),
        className = $this.find(':selected').attr('class') || "",
        data = $this.data('ft.select') || {};

    if (className !== data.previousClass) {
      $this.
        addClass(className).
        removeClass(data.previousClass).
        data('ft.select', $.merge({previousClass: className}, data));
    }

  };

  $document.on('change.ft.select.data-api', 'select:not([multiple])', setClassName);

  $document.on('DOMContentLoaded', function() {
    $document.find('select').data('ft.select', {previousClass: ""}).each(setClassName);
  });

})(jQuery);