(function($){
  'use strict';
  
  describe(".flashbar", function(){
    var $flashbar;
    
    beforeEach(function(){
      loadFixtures('flashbarFixture.html');
      $flashbar = $('.flashbar');
    });

    it('removes flashbar when close is clicked', function(){
      $flashbar.find('.flashbar__close').trigger('click');
      expect('.flashbar').not.toExist();
    });
  });

})(jQuery);