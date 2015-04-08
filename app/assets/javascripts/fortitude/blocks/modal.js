/*doc
---
title: Modal
name: js-modal
category: Javascript
---
Modals are used to block the user from doing any other actions except inside of a focused area of content.


```html_example
<div class="modal">
  <div class="modal__content">
    <div class="box box--default xs-p1">
      <h1 class="xs-mb1">Hello World</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi pariatur culpa earum! Qui autem totam cum porro minus iusto, sint consequatur odit voluptatem velit aliquam dolorum dolorem ut, repellendus hic!</p>
    </div>
  </div>
</div>
```

```js_example
$(document).on('open.ft.modal', '.modal', function() {
  // do some work
});
```

Below are some events you can listen to:

method             | description
------------------ | -----------------------
`open.ft.modal`    | The modal is about to show
`opened.ft.modal`  | The modal is shown
`close.ft.modal`   | The modal is about to hide
`closed.ft.modal`  | The modal is hidden
*/


(function($) {
  'use strict';

  $(document).on('open.ft.modal', '[ft-modal], [data-ft-modal]', function(event) {
    var $this = $(this);

    $.screenLock(true);
    $('[ft-shade], [data-ft-shade]').trigger('open.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      attr: 'ft-show',
      addClass: 'modal--is-active',
      endEvent: 'opened.ft.modal'
    });
  });

  $(document).on('close.ft.modal', '[ft-modal], [data-ft-modal]', function(event) {
    var $this = $(this);

    $.screenLock(false);
    $('[ft-shade], [data-ft-shade]').trigger('close.ft.shade');
    $('.container--fixed-top').css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      attr: 'ft-hide',
      removeClass: 'modal--is-active',
      endEvent: 'closed.ft.modal'
    });
  });

  $(document).on('click', '[ft-modal-open], [data-ft-modal-open]', function(){
    var $target = $.ftGetTarget($(this), 'ft-modal-open');
    $target.trigger('open.ft.modal');
  });

  $(document).on('click', '[ft-modal-close], [data-ft-modal-close]', function(){
    var $target = $.ftGetTarget($(this), 'ft-modal-close');
    $target.trigger('close.ft.modal');
  });

  $(document).on('click', '[ft-shade], [data-ft-shade]', function(){
    $('.modal--is-active').trigger('close.ft.modal');
  });

})(jQuery);
