/*doc
---
title: Popover
name: js-popover
category: Javascript
---
The `popover` is used to hide content or navigation behind a clickable element

<div class="note note--info">
  <p class="styleguide">Popovers don't need JavaScript by default, but if you have more then 1 popover and you don't want them to all stay shown when clicking on one of them then you'll want to use the JS Component</p>
  <p class="styleguide">when creating a popover if you add a <code class="styleguide">data-ft-popover</code> and set it to a value all other popovers with that value will hide when one is shown.</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-popover</code> on the <code class="styleguide">.popover</code> element</li>
    <li><code class="styleguide">data-ft-popover-toggle</code> on the <code class="styleguide">.popover__toggle</code> element</li>
    <li><code class="styleguide">data-ft-popover-content</code> on the <code class="styleguide">.popover__content</code> element</li>
  </ul>
</div>

<div class="note note--warning">
  <p class="styleguide">make sure to put the <code class="styleguide">.popover--is-shown__label</code> before the <code class="styleguide">.popover__label</code> this is nessasry so that if you only want to just <code class="styleguide">.popover__label</code> you can</p>
</div>

```html_example
<nav class="popover" data-ft-popover="example" data-show-class="fadeIn" data-hide-class="fadeOut">
  <input type="checkbox" class="popover__toggle" id="example-popover" data-ft-popover-toggle />
  <label for="example-popover" class="popover--is-shown__label">
    Show <i class="fa fa-caret-up"></i>
  </label>
  <label for="example-popover" class="popover__label">
    Hide <i class="fa fa-caret-down"></i>
  </label>
  <div class="popover__content box box--default animated" data-ft-popover-content>
    <ul class="bare-list">
      <li><a href="javascript: void(0);" class="xs-block xs-p1">One</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">Two</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">Three</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">Four</a></li>
    </ul>
  </div>
</nav>

<nav class="popover" data-ft-popover="example">
  <input type="checkbox" class="popover__toggle" id="example-popover" data-ft-popover-toggle />
  <label for="example-popover" class="popover--is-shown__label">
    Hide <i class="fa fa-caret-up"></i>
  </label>
  <label for="example-popover" class="popover__label">
    Show <i class="fa fa-caret-down"></i>
  </label>
  <div class="popover__content box box--default" data-ft-popover-content>
    <ul class="bare-list">
      <li><a href="javascript: void(0);" class="xs-block xs-p1">One</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">Two</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">Three</a></li>
      <li><a href="javascript: void(0);" class="xs-block xs-p1">Four</a></li>
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
