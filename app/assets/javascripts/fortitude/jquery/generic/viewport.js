(function($) {
  'use strict';

  // zoom fix on input elements
  var $viewport = $('meta[name="viewport"]');
  
  $(document).on('focus blur', ':input', function(event) {
    var scale = 1;
    
    if(event.type === 'focusout' ||
       event.type === 'blur'){
      
      scale = 5;
    } else {
      scale = 1;
    }
    
    $viewport.attr('content', 
      'width=device-width,' +
      'initial-scale=1,' +
      'maximum-scale=' + scale
    );
  });
})(jQuery);