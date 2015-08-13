/*doc
---
title: Select Input
name: js-select-input
category: Javascript
---
Select inputs don't have placeholders by default. The select input javascript component allows you to set a placeholder element for a select dropdown, and apply an extra class when the placeholder is chosen.

### Data Attributes

* `data-ft-select-input` on the `.select-input` element
* `class="any-class"` on the `<option>` representing the placeholder

Fortitude comes with a built-in `.placeholder` class you can use here.

### Events

event                    | description
------------------------ | -----------------------
`change.ft.select-input` | The select-input is firing a change event.

```js_example
$(document).on('change.ft.select-input', '.select-input', function(event) {
  // do some work
});
```

```html_preview_example
<div class="field xs-mb1">
  <label class="xs-block">
    Select Input
  </label>
  <select class="select-input" data-ft-select-input>
    <option value="" class="placeholder">Select One</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
  </select>
</div>
```
*/

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
      .find('[ft-select-input], [data-ft-select-input]')
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

  setTimeout(setupSelectInputs, 1);

})(jQuery);
