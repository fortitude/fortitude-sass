(function($){
  'use strict';

  var runTabsExamples = function(context){
    describe('.tabs-navigation and .tabs', function(){
      var itemActive = 'tabs-navigation__item--is-active',
          targetActive = 'tabs__content--is-shown',
          $itemOne, $itemTwo, $targetOne, $targetTwo;

      beforeEach(function(){
        $itemOne = $(context.itemOne);
        $targetOne = $(context.targetOne);

        $itemTwo = $(context.itemTwo);
        $targetTwo = $(context.targetTwo);
      });

      it('does not show tabs by default', function(){
        expect($itemOne).not.toHaveClass(itemActive);
        expect($itemTwo).not.toHaveClass(itemActive);
        expect($targetOne).not.toBeVisible();
        expect($targetTwo).not.toBeVisible();
      });

      it('shows tab one on click', function(done){
        $itemOne.trigger('click');

        _.multiCallback([
          ['shown.ft.tab', $itemOne],
          ['shown.ft.tabtarget', $targetOne]
        ]).then(function(){
          expect($itemOne).toHaveClass(itemActive);
          expect($itemTwo).not.toHaveClass(itemActive);

          expect($targetOne).toHaveClass(targetActive);
          expect($targetOne).toBeVisible();

          expect($targetTwo).not.toHaveClass(targetActive);
          expect($targetTwo).not.toBeVisible();
          done();
        });
      });

      it('marks other tabs as inactive', function(done){
        $itemOne.trigger('click');

        _.multiCallback([
          ['shown.ft.tab', $itemOne],
          ['shown.ft.tabtarget', $targetOne]
        ]).then(function(){
          $itemTwo.trigger('click');
        });

        _.multiCallback([
          ['shown.ft.tab', $itemTwo],
          ['shown.ft.tabtarget', $targetTwo]
        ]).then(function(){
          expect($itemOne).not.toHaveClass(itemActive);
          expect($itemTwo).toHaveClass(itemActive);

          expect($targetOne).not.toHaveClass(targetActive);
          expect($targetOne).not.toBeVisible();

          expect($targetTwo).toHaveClass(targetActive);
          expect($targetTwo).toBeVisible();
          done();
        });
      });
    });
  };

  _.runWithDataAndBare({
    spec: 'data-ft-tabs',
    fixture: 'tabsDataFixture.html',
    itemOne: '[data-ft-tabs-navigation-item]:eq(0)',
    targetOne: '[data-ft-tabs-content]:eq(0)',
    itemTwo: '[data-ft-tabs-navigation-item]:eq(1)',
    targetTwo: '[data-ft-tabs-content]:eq(1)'
  }, runTabsExamples);

  // note: we use a different fixture here
  // to ensure tabs are out-of-order in
  // that markup, and it's not falling
  // back on default behavior
  _.runWithDataAndBare({
    spec: 'data-ft-tabs with ids specified',
    fixture: 'tabsIdFixture.html',
    itemOne: '[data-ft-tabs-navigation-item="tab-one"]',
    targetOne: '#tab-one',
    itemTwo: '[data-ft-tabs-navigation-item="tab-two"]',
    targetTwo: '#tab-two'
  }, runTabsExamples);

})(jQuery);
