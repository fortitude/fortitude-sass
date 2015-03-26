(function($){
  'use strict';

  describe(".flashbar", function(){
    var $flashbar;

    beforeEach(function(){
      loadFixtures('flashbarFixture.html');
      $flashbar = $('.flashbar');
    });

    it('removes flashbar when close is clicked', function(done){
      $flashbar.find('.flashbar__close').trigger('click');
      $flashbar.on('closed.ft.flashbar', function(){
        expect($flashbar).toHaveClass('flashbar--closed');
        expect($flashbar).not.toBeVisible();
        done();
      });
    });
  });

})(jQuery);
