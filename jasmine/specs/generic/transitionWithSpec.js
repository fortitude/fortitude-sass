(function($){
  'use strict';

  describe('$.fn.ftTransitionWith', function(){
    var $transition, $noTransition;

    beforeEach(function(){
      loadFixtures('transitionWithFixture.html');
      $transition = $('#transition');
      $noTransition = $('#no-transition');
    });

    it('hides using ft-hide-class', function(done){
      $transition.ftTransitionWith({
        attr: 'ft-hide',
        addClass: 'transparent',
        removeClass: 'showing',
        endEvent: 'hidden.ft.transition'
      });

      expect($transition).toHaveClass('fadeOut');
      expect($transition.css('opacity')).toEqual('1');

      $transition.on('hidden.ft.transition', function(){
        expect($transition).toHaveClass('transparent');
        expect($transition).not.toHaveClass('showing');
        expect($transition).not.toHaveClass('fadeOut');
        done();
      });
    });

    it('shows using ft-show-class', function(done){
      $transition.addClass('tiny');

      $transition.ftTransitionWith({
        attr: 'ft-show',
        addClass: 'transparent',
        removeClass: 'showing',
        endEvent: 'shown.ft.transition'
      });

      expect($transition).toHaveClass('grow');
      expect($transition.css('width')).toEqual('1px');

      $transition.on('shown.ft.transition', function(){
        expect($transition).toHaveClass('transparent');
        expect($transition).not.toHaveClass('showing');
        expect($transition).not.toHaveClass('grow');
        done();
      });
    });

    it('handles race conditions', function(done){
      $transition.ftTransitionWith({
        attr: 'ft-hide',
        addClass: 'hidden',
        removeClass: 'showing',
        endEvent: 'hidden.ft.transition'
      });

      $transition.ftTransitionWith({
        attr: 'ft-show',
        addClass: 'shown',
        removeClass: 'hidden',
        endEvent: 'shown.ft.transition'
      });

      $transition.on('hidden.ft.transition', function(){
        expect('This callback should not be called').toEqual('Failed');
        done();
      });

      $transition.on('shown.ft.transition', function(){
        expect($transition).not.toHaveClass('fadeOut');
        expect($transition).not.toHaveClass('hidden');
        expect($transition).not.toHaveClass('fadeIn');
        expect($transition).toHaveClass('shown');
        done();
      });
    });
  });

  describe('$.fn.ftTransitionWith data attrs', function(){
    var $transition, $noTransition;

    beforeEach(function(){
      loadFixtures('transitionWithDataFixture.html');
      $transition = $('#transition');
      $noTransition = $('#no-transition');
    });

    it('hides using data-ft-hide-class', function(done){
      $transition.ftTransitionWith({
        attr: 'ft-hide',
        addClass: 'transparent',
        removeClass: 'showing',
        endEvent: 'hidden.ft.transition'
      });

      expect($transition).toHaveClass('fadeOut');
      expect($transition.css('opacity')).toEqual('1');

      $transition.on('hidden.ft.transition', function(){
        expect($transition).toHaveClass('transparent');
        expect($transition).not.toHaveClass('showing');
        expect($transition).not.toHaveClass('fadeOut');
        done();
      });
    });

    it('shows using data-ft-show-class', function(done){
      $transition.addClass('tiny');

      $transition.ftTransitionWith({
        attr: 'ft-show',
        addClass: 'transparent',
        removeClass: 'showing',
        endEvent: 'shown.ft.transition'
      });

      expect($transition).toHaveClass('grow');
      expect($transition.css('width')).toEqual('1px');

      $transition.on('shown.ft.transition', function(){
        expect($transition).toHaveClass('transparent');
        expect($transition).not.toHaveClass('showing');
        expect($transition).not.toHaveClass('grow');
        done();
      });
    });

    it('handles race conditions', function(done){
      $transition.ftTransitionWith({
        attr: 'ft-hide',
        addClass: 'hidden',
        removeClass: 'showing',
        endEvent: 'hidden.ft.transition'
      });

      $transition.ftTransitionWith({
        attr: 'ft-show',
        addClass: 'shown',
        removeClass: 'hidden',
        endEvent: 'shown.ft.transition'
      });

      $transition.on('hidden.ft.transition', function(){
        expect('This callback should not be called').toEqual('Failed');
        done();
      });

      $transition.on('shown.ft.transition', function(){
        expect($transition).not.toHaveClass('fadeOut');
        expect($transition).not.toHaveClass('hidden');
        expect($transition).not.toHaveClass('fadeIn');
        expect($transition).toHaveClass('shown');
        done();
      });
    });
  });
})(jQuery);