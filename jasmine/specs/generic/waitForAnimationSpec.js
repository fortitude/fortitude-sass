(function($){
  'use strict';

  describe('$.fn.waitForAnimation', function(){
    var $animate;
    
    beforeEach(function(){
      loadFixtures('waitForAnimationFixture.html');
      $animate = $('#animate');
    });

    it('waits for an animation to end', function(done){
      $animate.addClass('fadeOut');
      expect($animate.css('opacity')).toEqual('1');
      $animate.waitForAnimation()
        .then(function(){
          expect($animate.css('opacity')).toEqual('0');
          done();
        });
    });

    it('only runs one wait for animation', function(done){
      $animate.addClass('fadeOut').waitForAnimation().then(function(){
        expect('This callback should not run').toEqual('FAIL');
      });

      expect($animate.css('width')).toEqual('1px');
      $animate.addClass('grow').waitForAnimation().then(function(){
        expect($animate.css('width')).toEqual('100px');
        done();
      });
    });
  });

})(jQuery);