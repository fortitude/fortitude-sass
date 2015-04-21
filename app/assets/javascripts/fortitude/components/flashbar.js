/*doc
---
title: Flashbar
name: js-flashbar
category: Javascript
---
Flashbars are used to inform a user of something after an action and can optionally be dismissed

<div class="note note--info">
  <p class="styleguide">Flashbars don't need JavaScript by default, but if you want the flashbar to dismiss without an extra call to the server then you'll want to use the JS Component</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-flashbar</code> on the <code class="styleguide">.flashbar</code> element</li>
    <li><code class="styleguide">data-ft-flashbar-hide</code> on the <code class="styleguide">.flashbar__hide</code> element</li>
  </ul>
</div>

Below are some events you can listen to:

Event                | Description
-------------------- | -----------------------
`show.ft.flashbar`   | The flashbar is going to show
`shown.ft.flashbar`  | The flashbar is shown
`hide.ft.flashbar`   | The flashbar is going to hide
`hidden.ft.flashbar` | The flashbar is hidden

```js_example
$(document).on('show.ft.flashbar', '.flashbar', function(event) {
  // do some work
});
```


Class               | Description
------------------- | -----------------
`flashbar--default` | This is a basic flashbar
`flashbar--primary` | This is a flashbar for primary information
`flashbar--success` | This is a flashbar for success information
`flashbar--info`    | This is a flashbar for sidenote information
`flashbar--warning` | This is a flashbar for warning information
`flashbar--danger`  | This is a flashbar for destructive information

```html_preview_example
<div class="flashbar flashbar--default" data-ft-flashbar>
  <button class="flashbar__hide" data-ft-flashbar-hide>&times;</button>
  <div class="fluid-container">
    Default
  </div>
</div>
<div class="flashbar flashbar--primary" data-ft-flashbar>
  <button class="flashbar__hide" data-ft-flashbar-hide>&times;</button>
  <div class="fluid-container">
    Primary
  </div>
</div>
<div class="flashbar flashbar--success" data-ft-flashbar>
  <button class="flashbar__hide" data-ft-flashbar-hide>&times;</button>
  <div class="fluid-container">
    Success
  </div>
</div>
<div class="flashbar flashbar--info" data-ft-flashbar>
  <button class="flashbar__hide" data-ft-flashbar-hide>&times;</button>
  <div class="fluid-container">
    Info
  </div>
</div>
<div class="flashbar flashbar--warning" data-ft-flashbar>
  <button class="flashbar__hide" data-ft-flashbar-hide>&times;</button>
  <div class="fluid-container">
    Warning
  </div>
</div>
<div class="flashbar flashbar--danger" data-ft-flashbar>
  <button class="flashbar__hide" data-ft-flashbar-hide>&times;</button>
  <div class="fluid-container">
    Danger
  </div>
</div>
```
*/

(function($) {
  'use strict';

  $(document).on('hide.ft.flashbar', '[ft-flashbar], [data-ft-flashbar]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-hide-class',
      addClass: 'flashbar--is-hidden',
      endEvent: 'hidden.ft.flashbar'
    });
  });

  $(document).on('show.ft.flashbar', '[ft-flashbar], [data-ft-flashbar]', function(event){
    $(this).ftTransitionWith({
      attr: 'ft-show-class',
      removeClass: 'flashbar--is-hidden',
      endEvent: 'shown.ft.flashbar'
    });
  });

  $(document).on('click', '[ft-flashbar-hide], [data-ft-flashbar-hide]', function(event){
    $(this).closest('[ft-flashbar], [data-ft-flashbar]').trigger('hide.ft.flashbar');
  });

})(jQuery);
