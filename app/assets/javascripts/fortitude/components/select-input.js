/*doc
---
title: Select Input
name: js-select-input
category: Javascript
---
Select inputs don't have placeholders by default, this is a JS Component that allows for them.

<div class="note note--info">
  <p class="styleguide">Select inputs don't need JavaScript by default, but if you want select inputs to have placeholders then you'll want to use the JS Component</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-select-input</code> on the <code class="styleguide">.select-input</code> element</li>
  </ul>
</div>

Below are some events you can listen to:

event                    | description
------------------------ | -----------------------
`change.ft.select-input` | The select-input is firing a change event.

```js_example
$(document).on('change.ft.select-input', '.select-input', function(event) {
  // do some work
});
```


```html_example
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
      .find('[ft-select]')
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

  setTimeout(setupSelectInputs, 0);

})(jQuery);
