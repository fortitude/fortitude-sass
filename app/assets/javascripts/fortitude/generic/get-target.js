(function($){
  $.ftGetTarget = function($element, field){
    field = field || 'ft-target';

    var targetId = $element.attr(field) || $element.attr('data-' + field) || '';

    if( !targetId.match(/^#/) ){
      targetId = '#' + targetId;
    }

    return $(targetId);
  };
})(jQuery);
