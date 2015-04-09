/*doc
---
title: Flashbar
name: flashbar
category: Javascript
---
Flashbars are used to inform a user of something after an action and can optionally be dismissed

<div class="note note--info">
  <p class="styleguide">Flashbars don't need JavaScript by default, but if you want the close buttons to dismiss without an extra call to the server then you'll want to use the JS Component</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-flashbar</code> on the <code class="styleguide">.flashbar</code> element</li>
    <li><code class="styleguide">data-ft-flashbar-close</code> on the <code class="styleguide">.flashbar__close</code> element</li>
  </ul>
</div>

Below are some events you can listen to:

event                 | description
--------------------- | -----------------------
`open.ft.flashbar`    | The flashbar is going to open
`opened.ft.flashbar`  | The flashbar is opened
`close.ft.flashbar`   | The flashbar is going to close
`closed.ft.flashbar`  | The flashbar is closed

```js_example
$(document).on('open.ft.flashbar', '.flashbar', function(event) {
  // do some work
});
```


Class              | Description
------------------ | -----------------
flashbar--default  | This is a basic flashbar
flashbar--primary  | This is a flashbar for primary information
flashbar--success  | This is a flashbar for success information
flashbar--info     | This is a flashbar for sidenote information
flashbar--warning  | This is a flashbar for warning information
flashbar--danger   | This is a flashbar for destructive information

```html_example
<div class="flashbar flashbar--default" data-ft-flashbar>
  <button class="flashbar__close" data-ft-flashbar-close>&times;</button>
  <div class="fluid-container">
    Default
  </div>
</div>
<div class="flashbar flashbar--primary" data-ft-flashbar>
  <button class="flashbar__close" data-ft-flashbar-close>&times;</button>
  <div class="fluid-container">
    Primary
  </div>
</div>
<div class="flashbar flashbar--success" data-ft-flashbar>
  <button class="flashbar__close" data-ft-flashbar-close>&times;</button>
  <div class="fluid-container">
    Success
  </div>
</div>
<div class="flashbar flashbar--info" data-ft-flashbar>
  <button class="flashbar__close" data-ft-flashbar-close>&times;</button>
  <div class="fluid-container">
    Info
  </div>
</div>
<div class="flashbar flashbar--warning" data-ft-flashbar>
  <button class="flashbar__close" data-ft-flashbar-close>&times;</button>
  <div class="fluid-container">
    Warning
  </div>
</div>
<div class="flashbar flashbar--danger" data-ft-flashbar>
  <button class="flashbar__close" data-ft-flashbar-close>&times;</button>
  <div class="fluid-container">
    Danger
  </div>
</div>
```
*/

(function($) {
  'use strict';

  $(document).on('close.ft.flashbar', '[ft-flashbar], [data-ft-flashbar]', function(event) {
    $(this).ftTransitionWith({
      attr: 'ft-hide-class',
      addClass: 'flashbar--closed',
      endEvent: 'closed.ft.flashbar'
    });
  });

  $(document).on('open.ft.flashbar', '[ft-flashbar], [data-ft-flashbar]', function(event){
    $(this).ftTransitionWith({
      attr: 'ft-show-class',
      removeClass: 'flashbar--closed',
      endEvent: 'opened.ft.flashbar'
    });
  });

  $(document).on('click', '[ft-flashbar-close], [data-ft-flashbar-close]', function(event){
    $(this).closest('[ft-flashbar], [data-ft-flashbar]').trigger('close.ft.flashbar');
  });

})(jQuery);
