(function($){
  $.ftGetTarget = function($element, field){
    var targetId = $element.data(field);
    
    if( !targetId.match(/^#/) ){
      targetId = '#' + targetId;
    }
    
    return $(targetId);
  };
})(jQuery);