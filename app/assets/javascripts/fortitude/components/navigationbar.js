/*doc
---
title: Navigationbar
name: js-navigationbar
category: Javascript
---
The `navigationbar` object is used for the main navigation of a website.

<div class="note note--info">
  <p class="styleguide">Navigationbars don't need JavaScript by default, but if you want the navigationbar to trigger the shade component then you'll want to use the JS Component</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-navigationbar</code> on the <code class="styleguide">.navigationbar</code> element</li>
    <li><code class="styleguide">data-ft-navigationbar-toggle</code> on the <code class="styleguide">.navigationbar__toggle</code> element</li>
  </ul>
</div>

```html_example
<div class="navigationbar navigationbar--default" data-ft-navigationbar>
  <div class="fluid-container">
    <div class="navigationbar__header">
      <a class="navigationbar__logo" href="/" target="_self">Fortitude</a>
    </div>
    <nav class="navigationbar__nav">
      <input class="navigationbar__toggle" type="checkbox" id="navigationbar__toggle" data-ft-navigationbar-toggle>
      <label class="navigationbar__label" for="navigationbar__toggle">
        <i class="fa fa-bars"></i>
      </label>
      <ul class="navigationbar__list">
        <li class="navigationbar__item">
          <a href="objects.html" class="navigationbar__link">Objects</a>
        </li>
        <li class="navigationbar__item">
          <a href="structure.html" class="navigationbar__link">Structure</a>
        </li>
        <li class="navigationbar__item">
          <a href="utilities.html" class="navigationbar__link">Utilities</a>
        </li>
        <li class="navigationbar__item">
          <a href="javascript.html" class="navigationbar__link">Javascript</a>
        </li>
        <li class="navigationbar__item">
          <a href="architecture.html" class="navigationbar__link">Architecture</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
```
*/

(function($) {
  'use strict';

  $(document).on('change', '[ft-navigationbar-toggle], [data-ft-navigationbar-toggle]', function(){
    if($(this).prop('checked')){
      $('[ft-shade], [data-ft-shade]').trigger('show.ft.shade');
      $.screenLock();
    } else {
      $('[ft-shade], [data-ft-shade]').trigger('hide.ft.shade');
      $.screenLock(false);
    }
  });
})(jQuery);