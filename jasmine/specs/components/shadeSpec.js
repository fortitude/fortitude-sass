(function($){
  'use strict';

  var runShadeExamples = function(context){
    describe('js', function(){
      var $shade, $button;

      beforeEach(function(){
        $shade = $(context.shade);
        $button = $(context.button);
      });

      it('is not immediately visible', function(){
        expect($shade).not.toBeVisible();
      });

      it('is visible after event trigger', function(done){
        $button.trigger('click');
        $shade.on('shown.ft.shade', function(){
          expect($shade).toHaveClass('shade--is-shown');
          expect($shade).toBeVisible();
          done();
        });
      });

      it('hides when clicked on', function(done){
        $shade.trigger('show.ft.shade');
        $shade.on('shown.ft.shade', function(){
          expect($shade).toHaveClass('shade--is-shown');
          $shade.trigger('click');
        });

        $shade.on('hidden.ft.shade', function(){
          expect($shade).not.toBeVisible();
          done();
        });
      });
    });
  };

  _.runWithDataAndBare({
    spec: '.shade',
    fixture: 'shadeDataFixture.html',
    shade: '[data-ft-shade]',
    button: '[data-ft-shade-show]'
  }, runShadeExamples);
})(jQuery);
