/*doc
---
title: Tabs
name: js-tabs
category: Javascript
---
The tabs and tabs-navigation components are used to navigate between different sections of content in a tabbed interface.

### Data Attributes

* `data-ft-tabs` on the parent `.tabs` element
* `data-ft-tabs-navigation-item` on each `.tabs-navigation__item` elements
* `data-ft-tabs-content` on each `.tabs__content` element

<div class="note note--info">
  <p class="styleguide">By default, the tabs-navigation javascript will show and hide tabs based on their order in the html. To link a <code class="styleguide">.tabs-navigation__item</code> element to a tab somewhere else, set the <code class="styleguide">data-ft-tabs-navigation-item</code> attribute to the id of the linked tab.</p>
</div>

### Events

event                 | description
--------------------- | -----------------------
`show.ft.tab`         | This tab navigation item is being changed to the active state
`shown.ft.tab`        | This tab navigation item is in the active state
`hide.ft.tab`         | This tab navigation item is being changed to the inactive state
`hidden.ft.tab`       | This tab navigation item is in the inactive state
`show.ft.tabtarget`   | This tab content is being shown
`shown.ft.tabtarget`  | This tab content is shown
`hide.ft.tabtarget`   | This tab content is being hidden
`hidden.ft.tabtarget` | This tab content is hidden

```js_example
$(document).on('show.ft.tab', '.tabs', function(event, tabIndex) {
  // do some work
});
```

```html_preview_example
<nav class="tabs tabs--default" data-ft-tabs>
  <ul class="tabs-navigation tabs-navigation--fixed tabs-navigation--default xs-mb1">
    <li class="tabs-navigation__item tabs-navigation__item--is-active" data-ft-tabs-navigation-item>
      <a href="javascript: void(0);" class="tabs-navigation__link">Tab 1</a>
    </li>
    <li class="tabs-navigation__item" data-ft-tabs-navigation-item>
      <a href="javascript: void(0);" class="tabs-navigation__link">Tab 2</a>
    </li>
    <li class="tabs-navigation__item" data-ft-tabs-navigation-item>
      <a href="javascript: void(0);" class="tabs-navigation__link">Tab 3</a>
    </li>
  </ul>
  <div class="tabs__content tabs__content--is-shown xs-text-center" data-ft-tabs-content>
    <div class="box box--default xs-p1 xs-text-center">
      Content for tab 1
    </div>
  </div>
  <div class="tabs__content xs-text-center" data-ft-tabs-content>
    <div class="box box--info xs-p1 xs-text-center">
      Content for tab 2
    </div>
  </div>
  <div class="tabs__content xs-text-center" data-ft-tabs-content>
    <div class="box box--inverse xs-p1 xs-text-center">
      Content for tab 3
    </div>
  </div>
</nav>
```
*/

(function($){
  'use strict';

  var itemActive = 'tabs-navigation__item--is-active',
      targetActive = 'tabs__content--is-shown',
      tabItem = '[ft-tabs-navigation-item], [data-ft-tabs-navigation-item]',
      tabContent = '[ft-tabs-content], [data-ft-tabs-content]',
      tabParent = '[ft-tabs], [data-ft-tabs]',
      contentAttr = 'ft-tabs-navigation-item';

  var itemClicked = function($item){
    var $parent = $item.closest(tabParent),
        $content = $item.ftTarget(contentAttr),
        $siblings, activeClass, index;

    if(!$content.length){
      index = $parent.find(tabItem).index($item);
      $content = $parent.find(tabContent).eq(index);
    }

    if(!$content.length){ return; }

    $siblings = $parent.find(tabItem);

    if(!$siblings.length) { return; }

    $siblings.each(function(){
      // $this is a sibling of $item
      // so it will be another tabs-navigation__item
      var $this = $(this),
          $thisContent = $this.ftTarget(contentAttr);

      if(!$thisContent.length){
        index = $parent.find(tabItem).index($this);
        $thisContent = $parent.find(tabContent).eq(index);
      }

      if(!$thisContent.length){ return; }

      // return the item to hidden state
      $this.ftTransitionWith({
        attr: 'ft-hide-class',
        removeClass: itemActive,
        endEvent: 'hidden.ft.tab'
      });

      // return the item's content to hidden state
      $thisContent.ftTransitionWith({
        attr: 'ft-hide-class',
        removeClass: targetActive,
        endEvent: 'hidden.ft.tabtarget'
      });
    });

    $item.ftTransitionWith({
      attr: 'ft-show-class',
      addClass: itemActive,
      endEvent: 'shown.ft.tab'
    });

    return $content.ftTransitionWith({
      attr: 'ft-show-class',
      addClass: targetActive,
      endEvent: 'shown.ft.tabtarget'
    });
  };

  $(document).on('show.ft.tab', tabItem, function(event){
    itemClicked($(this));
  });

  $(document).on('click', tabItem, function(){
    $(this).trigger('show.ft.tab');
  });

})(jQuery);
