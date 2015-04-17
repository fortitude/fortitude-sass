/*doc
---
title: Shade
name: js-shade
category: Javascript
---
The `shade` object is used to dim the entire website use cases might be to allow the users focus to be on a specific element like navigation or a modal. You can also show and hide the shade using data- attributes, and the shade will automatically hide when clicked on.

<div class="note note--info">
  <p class="styleguide">Shades don't need JavaScript by default, but if you want the shade to show and dismiss without an extra call to the server, then you'll want to use the JS Component</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-shade-show</code> on any element</li>
    <li><code class="styleguide">data-ft-shade-hide</code> on any element</li>
  </ul>
</div>

Below are some events you can listen to:

event              | description
------------------ | -----------------------
`show.ft.shade`    | The shade is going to show
`shown.ft.shade`  | The shade is shown
`hide.ft.shade`   | The shade is going to hide
`hidden.ft.shade`  | The shade is hidden

```js_example
$(document).on('show.ft.shade', '.shade', function(event) {
  // do some work
});
```

```html_example
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
