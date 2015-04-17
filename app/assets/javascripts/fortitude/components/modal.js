/*doc
---
title: Modal
name: js-modal
category: Javascript
---
Modals are used to block the user from doing any other actions except inside of a focused area of content.

<div class="note note--info">
  <p class="styleguide">Modals don't need JavaScript by default, but if you want the modal to dismiss without an extra call to the server then you'll want to use the JS Component</p>
  <p class="styleguide">if you want a modal to have a specific width it's suggested that you set a <code class="styleguide">max-width</code> on an extension class. (Example below)</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-modal</code> on the <code class="styleguide">.modal</code> element</li>
    <li><code class="styleguide">data-ft-modal-hide</code> on the <code class="styleguide">.modal__hide</code> element</li>
  </ul>
</div>

```scss_example
.modal--767 {
  max-width: 76.7rem;
}
// usage <div class="modal modal--767">...</div>
```

Below are some events you can listen to:

event              | description
------------------ | -----------------------
`show.ft.modal`    | The modal is going to show
`shown.ft.modal`  | The modal is shown
`hide.ft.modal`   | The modal is going to hide
`hidden.ft.modal`  | The modal is hidden

```js_example
$(document).on('hide.ft.modal', '.modal', function(event) {
  // do some work
});
```


## Position

### Default <small>(middle)</small>

```html_example
<a href="javascript: void(0);" data-ft-modal-show="example-modal">Show Modal</a>
<div class="modal animated" id="example-modal" data-ft-modal data-ft-show-class="fadeInDown" data-ft-hide-class="fadeOutUp">
  <div class="modal__content">
    <button class="modal__hide" data-ft-modal-hide="example-modal">&times;</button>
    <div class="box box--default xs-p1">
      <h1 class="xs-mb1">Hello World</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi pariatur culpa earum! Qui autem totam cum porro minus iusto, sint consequatur odit voluptatem velit aliquam dolorum dolorem ut, repellendus hic!</p>
    </div>
  </div>
</div>
```

### Top
```html_example
<a href="javascript: void(0);" data-ft-modal-show="example-modal-top">Show Modal</a>
<div class="modal modal--top animated" id="example-modal-top" data-ft-modal data-ft-show-class="fadeInDown" data-ft-hide-class="fadeOutUp">
  <div class="modal__content">
    <button class="modal__hide" data-ft-modal-hide="example-modal-top">&times;</button>
    <div class="box box--default xs-p1">
      <h1 class="xs-mb1">Hello World</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi pariatur culpa earum! Qui autem totam cum porro minus iusto, sint consequatur odit voluptatem velit aliquam dolorum dolorem ut, repellendus hic!</p>
    </div>
  </div>
</div>
```

### Bottom
```html_example
<a href="javascript: void(0);" data-ft-modal-show="example-modal-bottom">Show Modal</a>
<div class="modal modal--bottom animated" id="example-modal-bottom" data-ft-modal data-ft-show-class="fadeInUp" data-ft-hide-class="fadeOutDown">
  <div class="modal__content">
    <button class="modal__hide" data-ft-modal-hide="example-modal-bottom">&times;</button>
    <div class="box box--default xs-p1">
      <h1 class="xs-mb1">Hello World</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi pariatur culpa earum! Qui autem totam cum porro minus iusto, sint consequatur odit voluptatem velit aliquam dolorum dolorem ut, repellendus hic!</p>
    </div>
  </div>
</div>
```
*/


(function($) {
  'use strict';

  $(document).on('show.ft.modal', '[ft-modal], [data-ft-modal]', function(event) {
    var $this = $(this);

    $.screenLock(true);
    $('[ft-shade], [data-ft-shade]').trigger('show.ft.shade');
    $this.css({
      paddingRight: $.measureScrollBar()
    });

    $this.ftTransitionWith({
      attr: 'ft-show-class',
      addClass: 'modal--is-shown',
      endEvent: 'shown.ft.modal'
    });
  });

  $(document).on('hide.ft.modal', '[ft-modal], [data-ft-modal]', function(event) {
    var $this = $(this);

    $.screenLock(false);
    $('[ft-shade], [data-ft-shade]').trigger('hide.ft.shade');
    $this.css({
      paddingRight: ''
    });

    $this.ftTransitionWith({
      attr: 'ft-hide-class',
      removeClass: 'modal--is-shown',
      endEvent: 'hidden.ft.modal'
    });
  });

  $(document).on('click', '[ft-modal-show], [data-ft-modal-show]', function(){
    var $target = $(this).ftTarget('ft-modal-show');
    $target.trigger('show.ft.modal');
  });

  $(document).on('click', '[ft-modal-hide], [data-ft-modal-hide]', function(){
    var $target = $(this).ftTarget('ft-modal-hide');
    $target.trigger('hide.ft.modal');
  });

  $(document).on('click', '[ft-shade], [data-ft-shade]', function(){
    $('.modal--is-shown').trigger('hide.ft.modal');
  });

})(jQuery);
