(function($){
  'use strict';

  describe(".modal", function(){

    var runModalExamples = function(context){

      describe('with modal loaded', function(){
        var $modal, $button, $shade, $hideButton;

        beforeEach(function(){
          loadFixtures(context.fixture);
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

    describe('with bare attributes', function(){
      var modalWithBareAttributes = {};

      beforeEach(function(){
        modalWithBareAttributes.fixture = 'modalFixture.html';
        modalWithBareAttributes.modal = '[ft-modal]';
        modalWithBareAttributes.button = '[ft-modal-show]';
        modalWithBareAttributes.hideButton = '[ft-modal-hide]';
        modalWithBareAttributes.shade = '[ft-shade]';
      });

      it('sets base attributes', function(){
        expect(modalWithBareAttributes.fixture).toEqual('modalFixture.html');
      });

      runModalExamples(modalWithBareAttributes);
    });

    describe('with bare attributes', function(){
      var modalWithDataAttributes = {};

      beforeEach(function(){
        modalWithDataAttributes.fixture = 'modalDataFixture.html';
        modalWithDataAttributes.modal = '[data-ft-modal]';
        modalWithDataAttributes.button = '[data-ft-modal-show]';
        modalWithDataAttributes.hideButton = '[data-ft-modal-hide]';
        modalWithDataAttributes.shade = '[data-ft-shade]';
      });

      runModalExamples(modalWithDataAttributes);
    });
  });
})(jQuery);
