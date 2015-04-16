/*doc
---
title: Tabs
name: js-tabs
category: Javascript
---
Tabs are used to navigate between different sections of content in a tabbed interface.

<div class="note note--info">
  <p class="styleguide">Tabs don't need JavaScript by default, but if you want the close buttons to dismiss without an extra call to the server then you'll want to use the JS Component</p>
  <p class="styleguide">You must provide the following data attributes if you want the JS component to work</p>
  <ul class="styleguide">
    <li><code class="styleguide">data-ft-tabs</code> on the <code class="styleguide">.tabs</code> element</li>
    <li><code class="styleguide">data-ft-tabs-content</code> on the <code class="styleguide">.tabs__content</code> element</li>
  </ul>
</div>

<div class="note note--warning">
  <p class="styleguide">This component depends on the <code class="styleguide">tabs-navigation</code> component</p>
</div>

Below are some events you can listen to:

event              | description
------------------ | -----------------------
`show.ft.tabs`     | The tabs will show a tab
`shown.ft.tabs`    | The tabs is showing a tab
`hide.ft.tabs`     | The tabs will hide a tab
`hidden.ft.tabs`   | The tabs is hiding a tab

```js_example
$(document).on('show.ft.tabs', '.tabs', function(event, tabIndex) {
  // do some work
});
```


### Default

```html_example
<nav class="tabs tabs--default" data-ft-tabs data-ft-show-class="fadeInDown" data-ft-hide-class="fadeOutUp">
  <ul class="tabs-navigation tabs-navigation--fixed tabs-navigation--default">
    <li class="tabs-navigation__item">
      <a href="javascript: void(0);" class="tabs-navigation__link" data-ft-tabs-navigation-link>Tab 1</a>
    </li>
    <li class="tabs-navigation__item">
      <a href="javascript: void(0);" class="tabs-navigation__link" data-ft-tabs-navigation-link>Tab 2</a>
    </li>
    <li class="tabs-navigation__item">
      <a href="javascript: void(0);" class="tabs-navigation__link" data-ft-tabs-navigation-link>Tab 3</a>
    </li>
  </ul>
  <div class="tabs__content" data-ft-tabs-content>
    Content for tab 1
  </div>
  <div class="tabs__content" data-ft-tabs-content>
    Content for tab 2
  </div>
  <div class="tabs__content" data-ft-tabs-content>
    Content for tab 3
  </div>
</nav>
```
*/

(function($){
  'use strict';

  var itemActive = 'tabs-navigation__item--is-active',
      targetActive = 'tabs__content--is-active',
      tabLink = '[ft-tabs-navigation-link], [data-ft-tabs-navigation-link]',
      tabContent = '[ft-tabs-content], [data-ft-tabs-content]',
      tabParent = '[ft-tabs], [data-ft-tabs]',
      contentAttr = 'ft-tabs-navigation-link';

  var linkClicked = function($link){
    var $parent = $link.closest(tabParent),
        $content = $link.ftTarget(contentAttr),
        $siblings, activeClass, index;

    if(!$content.length){
      index = $parent.find(tabLink).index($link);
      $content = $parent.find(tabContent).eq(index);
    }

    if(!$content.length){ return; }

    $siblings = $parent.find(tabLink);

    if(!$siblings.length) { return; }

    $siblings.each(function(){
      // $this is a sibling of $link
      // so it will be another tabs-navigation__link
      var $this = $(this),
          $thisContent = $this.ftTarget(contentAttr);

      if(!$thisContent.length){
        index = $parent.find(tabLink).index($this);
        $thisContent = $parent.find(tabContent).eq(index);
      }

      if(!$thisContent.length){ return; }

      // return the link to closed state
      $this.ftTransitionWith({
        attr: 'ft-hide-class',
        removeClass: itemActive,
        endEvent: 'closed.ft.tab'
      });

      // return the link's content to closed state
      $thisContent.ftTransitionWith({
        attr: 'ft-hide-class',
        removeClass: targetActive,
        endEvent: 'closed.ft.tabtarget'
      });
    });

    $link.ftTransitionWith({
      attr: 'ft-show-class',
      addClass: itemActive,
      endEvent: 'opened.ft.tab'
    });

    return $content.ftTransitionWith({
      attr: 'ft-show-class',
      addClass: targetActive,
      endEvent: 'opened.ft.tabtarget'
    });
  };

  $(document).on('open.ft.tab', tabLink, function(event){
    linkClicked($(this));
  });

  $(document).on('click', tabLink, function(){
    $(this).trigger('open.ft.tab');
  });

})(jQuery);
