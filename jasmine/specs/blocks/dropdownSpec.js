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
        checkDropdown = function($element){
          $element.find('.dropdown__toggle').prop('checked', true).trigger('change');
        },
        $dropdowns;

    beforeEach(function(){
      loadFixtures('dropdownFixture.html');
      $dropdowns = $('.dropdown');
    });

    it('is not open by default', function(){
      checkNotVisible($dropdowns.eq(0));
    });

    it('becomes visible when checked', function(done){
      var $dropdown = $dropdowns.eq(0);
      checkDropdown($dropdown);

      $dropdown.on('opened.ft.dropdown', function(){
        checkIsVisible($dropdown);
        $dropdowns.not($dropdowns.eq(0)).each(function(){
          checkNotVisible($(this));
        });
        done();
      });
    });

    it('hides dropdowns with the same data-ft-dropdown', function(done){
      var $first = $dropdowns.eq(0),
          $second = $dropdowns.eq(1);

      checkDropdown($first);
      $first.on('opened.ft.dropdown', function(){
        checkDropdown($second);
      });

      $first.on('closed.ft.dropdown', function(){
        checkNotVisible($first);
        checkIsVisible($second);
        done();
      });
    });

    it('allows open dropdowns that do not have the same data-ft-dropdown', function(done){
      var $first = $dropdowns.eq(0),
          $second = $dropdowns.eq(2);

      checkDropdown($first);
      $first.on('opened.ft.dropdown', function(){
        checkDropdown($second);
      });

      $second.on('opened.ft.dropdown', function(){
        expect($first).not.toHaveClass('fadeOut');
        checkIsVisible($second);
        done();
      });
    });

    it('hides fellow dropdowns, but not others', function(done){
      var allFinished = [];

      checkDropdown($dropdowns.eq(0));
      checkDropdown($dropdowns.eq(2));
      checkDropdown($dropdowns.eq(3));

      // partner of 0
      $dropdowns.eq(0).on('opened.ft.dropdown', function(){
        checkDropdown($dropdowns.eq(1));
      });

      // partner of 3
      $dropdowns.eq(3).on('opened.ft.dropdown', function(){
        checkDropdown($dropdowns.eq(4));
      });

      _.multiCallback([
        ['opened.ft.dropdown', $dropdowns.eq(2)],
        ['closed.ft.dropdown', $dropdowns.eq(0)],
        ['closed.ft.dropdown', $dropdowns.eq(3)]
      ]).then(function(){
        checkIsVisible($dropdowns.eq(1));
        checkIsVisible($dropdowns.eq(2));
        checkNotVisible($dropdowns.eq(0));
        checkIsVisible($dropdowns.eq(4));
        checkNotVisible($dropdowns.eq(3));
        done();
      });
    });
  });
})(jQuery);
