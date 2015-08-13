(function($) {
  $.fn.ftTarget = function(field) {
    $element = $(this);
    field = field || 'ft-target';

    var targetId = $element.attr(field) || $element.attr('data-' + field) || '';

    if( !targetId.match(/^#/) ){
      targetId = '#' + targetId;
    }

    return $(targetId);
  };
})(jQuery);
