/*doc
---
title: Shade
name: shade
category: Javascript
---
The `shade` object is used to dim the entire website use cases might be to allow the users focus to be on a specific element like navigation or a modal.

Below are some events you can listen to:

event              | description
------------------ | -----------------------
`open.ft.shade`    | The shade is going to open
`opened.ft.shade`  | The shade is opened
`close.ft.shade`   | The shade is going to close
`closed.ft.shade`  | The shade is closed

```js_example
$(document).on('open.ft.shade', '.shade', function(event) {
  // do some work
});
```
*/

(function($) {
  'use strict';

  $(document).on('open.ft.shade', '[ft-shade], [data-ft-shade]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-show-class',
      addClass: 'shade--is-active',
      endEvent: 'opened.ft.shade'
    });
  });

  $(document).on('close.ft.shade', '[ft-shade], [data-ft-shade]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-hide-class',
      removeClass: 'shade--is-active',
      endEvent: 'closed.ft.shade'
    });
  });

  $(document).on('click', '[ft-shade], [data-ft-shade], [ft-shade-close], [data-ft-shade-close]', function(event) {
    $(this).trigger('close.ft.shade');
  });

  $(document).on('click', '[ft-shade-open], [data-ft-shade-open]', function(event) {
    $('.shade').trigger('open.ft.shade');
  });

})(jQuery);
