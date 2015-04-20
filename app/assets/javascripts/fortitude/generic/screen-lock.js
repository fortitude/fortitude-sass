/*doc
---
title: Html screen lock
name: js-screen-lock
category: Javascript
---
Used to make the contents of a webpage unscrollable.
This is ideal when presenting content in a modal or similar UX patterns.

```js_example
$('.your-component').on('click', function(){
  $.screenLock();
});
```


*/

(function($) {
  'use strict';

  $.screenLock = function(locking) {
    var $html = $('html'),
        $body = $('body'),
        $fixedTopComponents = $('.container--fixed-top > *');

    if(typeof(locking) === 'undefined'){
      locking = true;
    }

    if (locking) {
      $html.addClass('html--is-locked');
      $body.css({paddingRight: $.measureScrollBar()});
      $fixedTopComponents.css({paddingRight: $.measureScrollBar()});
    } else {
      $html.removeClass('html--is-locked');
      $body.css({paddingRight: ''});
      $fixedTopComponents.css({paddingRight: ''});
    }
  };

})(jQuery);
