(function($){
  'use strict';

  describe(".flashbar", function(){
    var $flashbar;

    beforeEach(function(){
      loadFixtures('flashbarFixture.html');
      $flashbar = $('[ft-flashbar]');
    });

    it('removes flashbar when hide is clicked', function(done){
      $flashbar.find('.flashbar__hide').trigger('click');
      $flashbar.on('hidden.ft.flashbar', function(){
        expect($flashbar).toHaveClass('flashbar--is-hidden');
        expect($flashbar).not.toBeVisible();
        done();
      });
    });
  });

  describe(".flashbar data attrs", function(){
    var $flashbar;

    beforeEach(function(){
      loadFixtures('flashbarDataFixture.html');
      $flashbar = $('[data-ft-flashbar]');
    });

    it('removes flashbar when hide is clicked', function(done){
      $flashbar.find('.flashbar__hide').trigger('click');
      $flashbar.on('hidden.ft.flashbar', function(){
        expect($flashbar).toHaveClass('flashbar--is-hidden');
        expect($flashbar).not.toBeVisible();
        done();
      });
    });
  });


})(jQuery);
