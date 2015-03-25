(function($){
  'use strict';

  describe('$.screenLock', function(){
    var $html = $('html'),
        htmlClasses;

    beforeEach(function(){
      htmlClasses = $html.attr('class');
    });

    afterEach(function(){
      $html.attr('class', htmlClasses);
    });
    
    it('locks the screen', function(){
      $.screenLock();
      expect($html).toHaveClass('html--is-locked');
    });

    it('locks the screen with argument', function(){
      $.screenLock(true);
      expect($html).toHaveClass('html--is-locked');
    });

    it('unlocks the screen', function(){
      $.screenLock(false);
      expect($html).not.toHaveClass('html--is-locked');
    });
  });

})(jQuery);