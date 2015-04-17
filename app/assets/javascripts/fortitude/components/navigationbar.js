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

```html_preview_example
<nav class="navigationbar navigationbar--default" data-ft-navigationbar>
  <div class="fluid-container clearfix">
    <div class="navigationbar__header clearfix">
      <a class="navigationbar__logo" href="#" target="_self">Fortitude</a>
      <button class="button xs-inline-block sm-none xs-float-right" data-navigationbar-toggle>
        <i class="fa fa-bars"></i>
      </button>
      <button class="button xs-float-right sm-float-none">
        <i class="fa fa-eye-slash"></i>
      </button>
    </div>
    <nav class="navigationbar__nav navigationbar__nav--is-hidden">
      <ul class="navigationbar__list">
        <li class="navigationbar__item">
          <a href="#" class="navigationbar__link">Objects</a>
        </li>
        <li class="navigationbar__item">
          <a href="#" class="navigationbar__link">Structure</a>
        </li>
        <li class="navigationbar__item">
          <a href="#" class="navigationbar__link">Utilities</a>
        </li>
        <li class="navigationbar__item">
          <a href="#" class="navigationbar__link">Javascript</a>
        </li>
        <li class="navigationbar__item xs-prl1 sm-prl0">
          <a href="#" class="button button--full button--primary">Architecture</a>
        </li>
      </ul>
    </nav>
  </div>
</nav>
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
