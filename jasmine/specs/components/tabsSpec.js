(function($){
  'use strict';

  describe('.tabs-navigation and .tabs', function(){
    var itemActive = 'tabs-navigation__item--is-active',
        targetActive = 'tabs__content--is-shown',
        $itemOne, $itemTwo, $targetOne, $targetTwo;

    beforeEach(function(){
      loadFixtures('tabsFixture.html');
      $itemOne = $('[ft-tabs-navigation-link]').eq(0);
      $targetOne = $('[ft-tabs-content]').eq(0);

      $itemTwo = $('[ft-tabs-navigation-link]').eq(1);
      $targetTwo = $('[ft-tabs-content]').eq(1);
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
      $itemOne.trigger('show.ft.tab');
      $itemTwo.trigger('show.ft.tab');

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

  describe('.tabs-navigation and .tabs data attrs', function(){
    var itemActive = 'tabs-navigation__item--is-active',
        targetActive = 'tabs__content--is-shown',
        $itemOne, $itemTwo, $targetOne, $targetTwo;

    beforeEach(function(){
      loadFixtures('tabsDataFixture.html');
      $itemOne = $('[data-ft-tabs-navigation-link]').eq(0);
      $targetOne = $('[data-ft-tabs-content]').eq(0);

      $itemTwo = $('[data-ft-tabs-navigation-link]').eq(1);
      $targetTwo = $('[data-ft-tabs-content]').eq(1);
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
      $itemOne.trigger('show.ft.tab');
      $itemTwo.trigger('show.ft.tab');

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

  describe('.tabs-navigation and .tabs with specified ids', function(){
    var itemActive = 'tabs-navigation__item--is-active',
        targetActive = 'tabs__content--is-shown',
        $itemOne, $itemTwo, $targetOne, $targetTwo;

    beforeEach(function(){
      loadFixtures('tabsIdFixture.html');
      $itemOne = $('[data-ft-tabs-navigation-link="tab-one"]');
      $targetOne = $('#tab-one');

      $itemTwo = $('[data-ft-tabs-navigation-link="tab-two"]');
      $targetTwo = $('#tab-two');
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
      $itemOne.trigger('show.ft.tab');
      $itemTwo.trigger('show.ft.tab');

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
})(jQuery);
