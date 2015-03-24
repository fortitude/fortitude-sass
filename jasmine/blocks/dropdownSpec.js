(function($){
  'use strict';

  describe('.dropdown', function(){
    var notChecked = '.dropdown__text:not(.dropdown__text--is-checked)',
        checkNotVisible = function($dropdown){
          expect($dropdown.find(notChecked)).toBeVisible();
          expect($dropdown.find('.dropdown__text--is-checked')).not.toBeVisible();
          expect($dropdown.find('.dropdown__navigation')).not.toBeVisible();
        },
        checkIsVisible = function($dropdown){
          expect($dropdown.find(notChecked)).not.toBeVisible();
          expect($dropdown.find('.dropdown__text--is-checked')).toBeVisible();
          expect($dropdown.find('.dropdown__navigation')).toBeVisible();
        },
        $dropdowns;
    
    beforeEach(function(){
      loadFixtures('dropdownFixture.html');
      $dropdowns = $('.dropdown');
    });

    it('is not open by default', function(){
      checkNotVisible($dropdowns.eq(0));
    });

    it('becomes visible when checked', function(){
      $dropdowns.eq(0).find('.dropdown__toggle').trigger('click');
      checkIsVisible($dropdowns.eq(0));
      $dropdowns.not($dropdowns.eq(0)).each(function(){
        checkNotVisible($(this));
      });
    });

    it('hides dropdowns with the same data-ft-dropdown', function(){
      $dropdowns.eq(0).find('.dropdown__toggle').trigger('click');
      $dropdowns.eq(1).find('.dropdown__toggle').trigger('click');
      checkNotVisible($dropdowns.eq(0));
      checkIsVisible($dropdowns.eq(1));
    });

    it('allows open dropdowns that do not have the same data-ft-dropdown', function(){
      $dropdowns.eq(0).find('.dropdown__toggle').trigger('click');
      $dropdowns.eq(2).find('.dropdown__toggle').trigger('click');
      checkIsVisible($dropdowns.eq(0));
      checkIsVisible($dropdowns.eq(2));
    });

    it('hides fellow dropdowns, but not others', function(){
      $dropdowns.eq(0).find('.dropdown__toggle').trigger('click');
      $dropdowns.eq(2).find('.dropdown__toggle').trigger('click');
      $dropdowns.eq(3).find('.dropdown__toggle').trigger('click');

      // partner of 0
      $dropdowns.eq(1).find('.dropdown__toggle').trigger('click');

      // partner of 3
      $dropdowns.eq(4).find('.dropdown__toggle').trigger('click');

      checkIsVisible($dropdowns.eq(1));
      checkIsVisible($dropdowns.eq(2));
      checkIsVisible($dropdowns.eq(4));
      checkNotVisible($dropdowns.eq(0));
      checkNotVisible($dropdowns.eq(3));
    });
  });
})(jQuery);