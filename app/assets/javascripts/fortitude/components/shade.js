/*doc
---
title: Shade
name: js-shade
category: Javascript
---
The shade component is used to dim the entire website, which can help the user focus on a specific element such as navigation or a modal. The javascript allows you to show and hide the shade by clicking on elements, and hides the shade when it is clicked on.

### Data Attributes

* `data-ft-shade` on the `.shade` element
* `data-ft-shade-show` on an element to show the shade when clicked
* `data-ft-shade-hide` on an element to hide the shade when clicked

### Events

event              | description
------------------ | -----------------------
`show.ft.shade`    | The shade is going to show
`shown.ft.shade`   | The shade is shown
`hide.ft.shade`    | The shade is going to hide
`hidden.ft.shade`  | The shade is hidden

```js_example
$(document).on('show.ft.shade', '.shade', function(event) {
  // do some work
});
```

```html_preview_example
<button class="button button--default" data-ft-shade-show>Show Shade</button>
```



*/

(function($) {
  'use strict';

  $(document).on('show.ft.shade', '[ft-shade], [data-ft-shade]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-show-class',
      addClass: 'shade--is-shown',
      endEvent: 'shown.ft.shade'
    });
  });

  $(document).on('hide.ft.shade', '[ft-shade], [data-ft-shade]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-hide-class',
      removeClass: 'shade--is-shown',
      endEvent: 'hidden.ft.shade'
    });
  });

  $(document).on('click', '[ft-shade], [data-ft-shade], [ft-shade-hide], [data-ft-shade-hide]', function(event) {
    $(this).trigger('hide.ft.shade');
  });

  $(document).on('click', '[ft-shade-show], [data-ft-shade-show]', function(event) {
    $('.shade').trigger('show.ft.shade');
  });

})(jQuery);
