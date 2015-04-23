/*doc
---
title: Navigationbar
name: js-navigationbar
category: Javascript
---
The `navigationbar` object is used for the main navigation of your site or app. The javascript component allows you to show and hide the collapsed mobile navigationbar.

### Data Attributes

* `data-ft-navigationbar` on the `.navigationbar` element
* `data-ft-navigationbar-toggle` n the `.navigationbar__toggle` element

### Events

Event                     | Description
--------------------------| -----------------------
`show.ft.navigationbar`   | The navigationbar is going to show
`shown.ft.navigationbar`  | The navigationbar is shown
`hide.ft.navigationbar`   | The navigationbar is going to hide
`hidden.ft.navigationbar` | The navigationbar is hidden

```js_example
$(document).on('show.ft.navigationbar', '.navigationbar', function(event) {
  // do some work
});
```

```html_preview_example
<nav class="navigationbar navigationbar--default" data-ft-navigationbar>
  <div class="fluid-container clearfix">
    <div class="navigationbar__header clearfix">
      <a class="navigationbar__logo" href="#" target="_self">Fortitude</a>
      <button class="button xs-inline-block sm-none xs-float-right" data-ft-navigationbar-toggle>
        <i class="fa fa-bars"></i>
      </button>
      <button class="button xs-float-right sm-float-none">
        <i class="fa fa-eye-slash"></i>
      </button>
    </div>
    <nav class="navigationbar__nav navigationbar__nav--is-hidden" data-ft-navigationbar-nav>
      <ul class="navigationbar__list">
        <li class="navigationbar__item">
          <a href="javascript:void(0);" class="navigationbar__link">Objects</a>
        </li>
        <li class="navigationbar__item">
          <a href="javascript:void(0);" class="navigationbar__link">Structure</a>
        </li>
        <li class="navigationbar__item">
          <a href="javascript:void(0);" class="navigationbar__link">Utilities</a>
        </li>
        <li class="navigationbar__item">
          <a href="javascript:void(0);" class="navigationbar__link">Javascript</a>
        </li>
        <li class="navigationbar__item xs-prl1 sm-prl0">
          <a href="javascript:void(0);" class="button button--full button--primary">Architecture</a>
        </li>
      </ul>
    </nav>
  </div>
</nav>
```
*/

(function($) {
  'use strict';

  var navParentSelector = '[ft-navigationbar], [data-ft-navigationbar]',
      navSelector = '[ft-navigationbar-nav], [data-ft-navigationbar-nav]',
      navToggleSelector = '[ft-navigationbar-toggle], [data-ft-navigationbar-toggle]',
      hideClass = 'navigationbar__nav--is-hidden';

  $(document).on('show.ft.navigationbar', navParentSelector, function(){
    var $this = $(this),
        $navigationbarNav = $this.find(navSelector);

    // can't use ftTransitionWith, since it has
    // to be visible during animation
    $navigationbarNav.removeClass(hideClass);

    $navigationbarNav.ftTransitionWith({
      attr: 'ft-show-class',
      endEvent: 'shown.ft.navigationbar'
    });
  });

  $(document).on('hide.ft.navigationbar', navParentSelector, function(){
    var $this = $(this),
        $navigationbarNav = $this.find(navSelector);

    $navigationbarNav.ftTransitionWith({
      attr: 'ft-hide-class'
    }).then(function(){
      $navigationbarNav.addClass(hideClass);
      $this.trigger('hidden.ft.navigationbar');
    });
  });

  $(document).on('click', navToggleSelector, function(){
    var $this = $(this),
        $navigationbar = $this.closest(navParentSelector),
        $navigationbarNav = $navigationbar.find(navSelector);

    if($navigationbarNav.hasClass(hideClass)){
      $navigationbar.trigger('show.ft.navigationbar');
    } else {
      $navigationbar.trigger('hide.ft.navigationbar');
    }
  });
})(jQuery);
