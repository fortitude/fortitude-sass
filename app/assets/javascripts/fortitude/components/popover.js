/*doc
---
title: Popover
name: js-popover
category: Javascript
---
The popover component is used to hide content or navigation behind a clickable element. You can specify different content to be shown when the popover is shown or hidden via the `.popover--is-shown__label` and `.popover__label` elements. You can specify the content of the popover via the `.popover__content` element. This functionality does _not_ require javascript.

<div class="note note--warning">
  <p class="styleguide">Put the <code class="styleguide">.popover--is-shown__label</code> element before the <code class="styleguide">.popover__label</code> element. This allows you to specify different html for when the popover is shown and when it is hidden. This functionality does <em class="text--italic">not</em> require javascript.</p>
  <p class="styleguide">Use a <code class="styleguide">&lt;span&gt;</code> for buttons inside the <code class="styleguide">.popover__label</code> element. The <code class="styleguide">&lt;label&gt;</code> element is used to trigger the checkbox to show or hide the popover without javascript.</p>
</div>

The javascript component covers combining popovers into groups, and allowing only one popover per group to be shown at once. For example, if you have multiple drop-down lists in a navigationbar.

### Data Attributes

* `data-ft-popover="group-name"` on the `.popover` element
* `data-ft-popover-toggle` on the `.popover__toggle` element
* `data-ft-popover-content` on the `.popover__content` element

### Events

Event               | Description
--------------------| -----------------------
`show.ft.popover`   | The popover is going to show
`shown.ft.popover`  | The popover is shown
`hide.ft.popover`   | The popover is going to hide
`hidden.ft.popover` | The popover is hidden

```js_example
$(document).on('show.ft.popover', '.popover', function(event) {
  // do some work
});
```

```html_preview_example
<nav class="popover" data-ft-popover="example" data-show-class="fadeIn" data-hide-class="fadeOut">
  <input type="checkbox" class="popover__toggle" id="menu-one-toggle" data-ft-popover-toggle />
  <label for="menu-one-toggle" class="popover--is-shown__label">
    <span class="button button--default">One <i class="fa fa-caret-up"></i></span>
  </label>
  <label for="menu-one-toggle" class="popover__label">
    <span class="button button--default">One <i class="fa fa-caret-down"></i></span>
  </label>
  <div class="popover__content box box--default animated" data-ft-popover-content>
    <ul class="bare-list">
      <li><a href="javascript: void(0);" class="xs-block xs-p1">1-1</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">1-2</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">1-3</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">1-4</a></li>
    </ul>
  </div>
</nav>

<nav class="popover" data-ft-popover="example">
  <input type="checkbox" class="popover__toggle" id="menu-two-toggle" data-ft-popover-toggle />
  <label for="menu-two-toggle" class="popover--is-shown__label">
    <span class="button button--default">Two <i class="fa fa-caret-up"></i></span>
  </label>
  <label for="menu-two-toggle" class="popover__label">
    <span class="button button--default">Two <i class="fa fa-caret-down"></i></span>
  </label>
  <div class="popover__content box box--styleguide" data-ft-popover-content>
    <ul class="bare-list">
      <li><a href="javascript: void(0);" class="xs-block xs-p1">2-1</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">2-2</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">2-3</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">2-4</a></li>
    </ul>
  </div>
</nav>
```
*/


(function($){
  'use strict';

  $(document).on('show.ft.popover', '[ft-popover], [data-ft-popover]', function(event){
    var $popover = $(this),
        popoverIdentifier = $popover.attr('ft-popover') || $popover.attr('data-ft-popover');

    $popover.ftTransitionWith({
      attr: 'ft-show-class',
      endEvent: 'shown.ft.popover'
    }).then(function(){
      $popover.prop('checked', true);
    });

    if(popoverIdentifier){
      $('[ft-popover="' + popoverIdentifier + '"], [data-ft-popover="' + popoverIdentifier + '"]').each(function(){
        var $element = $(this);
        if(!$element.is($popover)){
          $element.trigger('hide.ft.popover');
        }
      });
    }
  });

  $(document).on('hide.ft.popover', '[ft-popover], [data-ft-popover]', function(event){
    $(this).ftTransitionWith({
             attr: 'ft-hide-class'
           }).then(function(){
             $(this).find('[ft-popover-toggle], [data-ft-popover-toggle]').prop('checked', false);
             $(this).trigger('hidden.ft.popover');
           });
  });

  var toggleClasses = [
    '[ft-popover] > [ft-popover-toggle]',
    '[data-ft-popover] > [data-ft-popover-toggle]',
    '[ft-popover] > [data-ft-popover-toggle]',
    '[data-ft-popover] > [ft-popover-toggle]'
  ].join(', ');

  $(document).on('change', toggleClasses, function(event){
    var $this = $(this);
    if($this.is(':checked')){
      $(this).closest('[ft-popover], [data-ft-popover]').trigger('show.ft.popover');
    } else {
      $(this).closest('[ft-popover], [data-ft-popover]').trigger('hide.ft.popover');
    }
  });

})(jQuery);
