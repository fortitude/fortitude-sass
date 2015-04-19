(function($){
  'use strict';

  describe(".modal", function(){

    var runModalExamples = function(context){

      describe('with modal loaded', function(){
        var $modal, $button, $shade, $hideButton;

        beforeEach(function(){
          $modal = $(context.modal);
          $button = $(context.button);
          $hideButton = $(context.hideButton);
          $shade = $(context.shade);
        });

        it('has expected values', function(){
          expect($modal.length).toEqual(1);
          expect($button.length).toEqual(1);
          expect($hideButton.length).toEqual(1);
          expect($shade.length).toEqual(1);
        });

        it('is not visible by default', function(){
          expect($shade).not.toBeVisible();
          expect($modal).not.toBeVisible();
        });

        it('shows modal on ft-modal-show click', function(done){
          $button.trigger('click');
          _.multiCallback([
            ['shown.ft.shade', $shade],
            ['shown.ft.modal', $modal]
          ]).then(function(){
            expect($shade).toBeVisible();
            expect($modal).toBeVisible();
            done();
          });
        });

        it('hides modal on ft-modal-hide click', function(done){
          $modal.trigger('show.ft.modal');
          $modal.on('shown.ft.modal', function(){
            $hideButton.trigger('click');
          });

          _.multiCallback([
            ['hidden.ft.shade', $shade],
            ['hidden.ft.modal', $modal]
          ]).then(function(){
            expect($shade).not.toBeVisible();
            expect($modal).not.toBeVisible();
            done();
          });

        });

        it('hides modal on .shade click', function(done){
          $modal.trigger('show.ft.modal');
          $modal.on('shown.ft.modal', function(){
            $shade.trigger('click');
          });

          _.multiCallback([
            ['hidden.ft.shade', $shade],
            ['hidden.ft.modal', $modal]
          ]).then(function(){
            expect($shade).not.toBeVisible();
            expect($modal).not.toBeVisible();
            done();
          });
        });

        describe('without shade', function(){
          beforeEach(function(){
            $shade.remove();
          });

          it('hides modal on click outside modal', function(done){
            expect($modal).not.toHaveData('ftModalHideHandler');
            $modal.trigger('show.ft.modal');

            $modal.on('shown.ft.modal', function(){
              $('body').trigger('click');
            });

            $modal.on('hidden.ft.modal', function(){
              expect($modal).not.toBeVisible();
              expect($modal.data('ftModalHideHandler')).toBeFalsy();
              done();
            });
          });
        });
      });
    };

    _.runWithDataAndBare({
      spec: 'modal',
      fixture: 'modalDataFixture.html',
      modal: '[data-ft-modal]',
      button: '[data-ft-modal-show]',
      hideButton: '[data-ft-modal-hide]',
      shade: '[data-ft-shade]'
    }, runModalExamples);
  });
})(jQuery);
