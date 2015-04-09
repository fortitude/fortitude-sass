(function($){
  'use strict';

  describe('.popover', function(){
    var checkNotVisible = function($popover){
          expect($popover.find('.popover__label')).toBeVisible();
          expect($popover.find('.popover--is-open__label')).not.toBeVisible();
          expect($popover.find('.popover__content')).not.toBeVisible();
        },
        checkIsVisible = function($popover){
          expect($popover.find('.popover__label')).not.toBeVisible();
          expect($popover.find('.popover--is-open__label')).toBeVisible();
          expect($popover.find('.popover__content')).toBeVisible();
        },
        checkPopover = function($element){
          $element.find('.popover__toggle').prop('checked', true).trigger('change');
        },
        $popovers;

    beforeEach(function(){
      loadFixtures('popoverFixture.html');
      $popovers = $('[ft-popover]');
    });

    it('is not open by default', function(){
      checkNotVisible($popovers.eq(0));
    });

    it('becomes visible when checked', function(done){
      var $popover = $popovers.eq(0);
      checkPopover($popover);

      $popover.on('opened.ft.popover', function(){
        checkIsVisible($popover);
        $popovers.not($popovers.eq(0)).each(function(){
          checkNotVisible($(this));
        });
        done();
      });
    });

    it('hides popovers with the same data-ft-popover', function(done){
      var $first = $popovers.eq(0),
          $second = $popovers.eq(1);

      checkPopover($first);
      $first.on('opened.ft.popover', function(){
        checkPopover($second);
      });

      $first.on('closed.ft.popover', function(){
        checkNotVisible($first);
        checkIsVisible($second);
        done();
      });
    });

    it('allows open popovers that do not have the same ft-popover', function(done){
      var $first = $popovers.eq(0),
          $second = $popovers.eq(2);

      checkPopover($first);
      $first.on('opened.ft.popover', function(){
        checkPopover($second);
      });

      $second.on('opened.ft.popover', function(){
        expect($first).not.toHaveClass('fadeOut');
        checkIsVisible($second);
        done();
      });
    });

    it('hides fellow popovers, but not others', function(done){
      var allFinished = [];

      checkPopover($popovers.eq(0));
      checkPopover($popovers.eq(2));
      checkPopover($popovers.eq(3));

      // partner of 0
      $popovers.eq(0).on('opened.ft.popover', function(){
        checkPopover($popovers.eq(1));
      });

      // partner of 3
      $popovers.eq(3).on('opened.ft.popover', function(){
        checkPopover($popovers.eq(4));
      });

      _.multiCallback([
        ['opened.ft.popover', $popovers.eq(2)],
        ['closed.ft.popover', $popovers.eq(0)],
        ['closed.ft.popover', $popovers.eq(3)]
      ]).then(function(){
        checkIsVisible($popovers.eq(1));
        checkIsVisible($popovers.eq(2));
        checkNotVisible($popovers.eq(0));
        checkIsVisible($popovers.eq(4));
        checkNotVisible($popovers.eq(3));
        done();
      });
    });
  });

  describe('.popover data attributes', function(){
    var checkNotVisible = function($popover){
          expect($popover.find('.popover__label')).toBeVisible();
          expect($popover.find('.popover--is-open__label')).not.toBeVisible();
          expect($popover.find('.popover__content')).not.toBeVisible();
        },
        checkIsVisible = function($popover){
          expect($popover.find('.popover__label')).not.toBeVisible();
          expect($popover.find('.popover--is-open__label')).toBeVisible();
          expect($popover.find('.popover__content')).toBeVisible();
        },
        checkPopover = function($element){
          $element.find('.popover__toggle').prop('checked', true).trigger('change');
        },
        $popovers;

    beforeEach(function(){
      loadFixtures('popoverDataFixture.html');
      $popovers = $('[data-ft-popover]');
    });

    it('is not open by default', function(){
      checkNotVisible($popovers.eq(0));
    });

    it('becomes visible when checked', function(done){
      var $popover = $popovers.eq(0);
      checkPopover($popover);

      $popover.on('opened.ft.popover', function(){
        checkIsVisible($popover);
        $popovers.not($popovers.eq(0)).each(function(){
          checkNotVisible($(this));
        });
        done();
      });
    });

    it('hides popovers with the same data-ft-popover', function(done){
      var $first = $popovers.eq(0),
          $second = $popovers.eq(1);

      checkPopover($first);
      $first.on('opened.ft.popover', function(){
        checkPopover($second);
      });

      $first.on('closed.ft.popover', function(){
        checkNotVisible($first);
        checkIsVisible($second);
        done();
      });
    });

    it('allows open popovers that do not have the same ft-popover', function(done){
      var $first = $popovers.eq(0),
          $second = $popovers.eq(2);

      checkPopover($first);
      $first.on('opened.ft.popover', function(){
        checkPopover($second);
      });

      $second.on('opened.ft.popover', function(){
        expect($first).not.toHaveClass('fadeOut');
        checkIsVisible($second);
        done();
      });
    });

    it('hides fellow popovers, but not others', function(done){
      var allFinished = [];

      checkPopover($popovers.eq(0));
      checkPopover($popovers.eq(2));
      checkPopover($popovers.eq(3));

      // partner of 0
      $popovers.eq(0).on('opened.ft.popover', function(){
        checkPopover($popovers.eq(1));
      });

      // partner of 3
      $popovers.eq(3).on('opened.ft.popover', function(){
        checkPopover($popovers.eq(4));
      });

      _.multiCallback([
        ['opened.ft.popover', $popovers.eq(2)],
        ['closed.ft.popover', $popovers.eq(0)],
        ['closed.ft.popover', $popovers.eq(3)]
      ]).then(function(){
        checkIsVisible($popovers.eq(1));
        checkIsVisible($popovers.eq(2));
        checkNotVisible($popovers.eq(0));
        checkIsVisible($popovers.eq(4));
        checkNotVisible($popovers.eq(3));
        done();
      });
    });
  });
})(jQuery);
