(function($){
  'use strict';

  describe('.tabs-navigation and .tabs', function(){
    var itemActive = 'tabs-navigation__item--is-active',
        targetActive = 'tabs__target--is-active',
        $itemOne, $itemTwo, $targetOne, $targetTwo;
    
    beforeEach(function(){
      loadFixtures('tabsFixture.html');
      $itemOne = $('[data-ft-tab="tab-one"]');
      $targetOne = $('#tab-one');
      
      $itemTwo = $('[data-ft-tab="tab-two"]');
      $targetTwo = $('#tab-two');
    });

    it('does not show tabs by default', function(){
      expect($itemOne).not.toHaveClass(itemActive);
      expect($itemTwo).not.toHaveClass(itemActive);
      expect($targetOne).not.toBeVisible();
      expect($targetTwo).not.toBeVisible();
    });

    it('shows tab one on click', function(){
      $itemOne.trigger('click');
      expect($itemOne).toHaveClass(itemActive);
      expect($itemTwo).not.toHaveClass(itemActive);

      expect($targetOne).toHaveClass(targetActive);
      expect($targetOne).toBeVisible();

      expect($targetTwo).not.toHaveClass(targetActive);
      expect($targetTwo).not.toBeVisible();
    });

    it('marks other tabs as inactive', function(){
      $itemOne.trigger('select.ft.tab');
      $itemTwo.trigger('select.ft.tab');

      expect($itemOne).not.toHaveClass(itemActive);
      expect($itemTwo).toHaveClass(itemActive);

      expect($targetOne).not.toHaveClass(targetActive);
      expect($targetOne).not.toBeVisible();

      expect($targetTwo).toHaveClass(targetActive);
      expect($targetTwo).toBeVisible();
    });
  });
})(jQuery);