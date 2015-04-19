(function($){
  'use strict';

  var runFlashbarExamples = function(context){
    describe("js", function(){
      var $flashbar;

      beforeEach(function(){
        $flashbar = $(context.flashbar);
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
  };

  _.runWithDataAndBare({
    spec: '.flashbar',
    fixture: 'flashbarDataFixture.html',
    flashbar: '[data-ft-flashbar]'
  }, runFlashbarExamples);


})(jQuery);
