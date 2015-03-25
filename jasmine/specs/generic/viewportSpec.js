(function($){
  'use strict';

  describe('the input zoom fix', function(){
    var contentVal = 'width=device-width,' +
          'initial-scale=1,' +
          'maximum-scale=',
        $viewport, $input;
    
    beforeEach(function(){
      loadFixtures('viewportFixture.html');
      $viewport = $('meta[name=viewport]');
      $input = $('input');
    });
    
    it('fixes the zoom when input focused', function(){
      $input.trigger('focus');
      expect($viewport.attr('content')).toEqual(contentVal + '1');
    });

    it('returns zoom to normal when input focused out', function(){
      $input.trigger('focusout');
      expect($viewport.attr('content')).toEqual(contentVal + '5');
    });

    it('returns zoom to normal when input blurred', function(){
      $input.trigger('blur');
      expect($viewport.attr('content')).toEqual(contentVal + '5');
    });
  });

})(jQuery);