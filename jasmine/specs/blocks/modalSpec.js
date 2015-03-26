(function($){
  'use strict';

  describe(".modal", function(){
    var $modal, $animatedModal, $button, $animateButton, $shade, $closeButton;

    beforeEach(function(){
      loadFixtures('modalFixture.html');
      $modal = $('#example-modal');
      $button = $('button[data-ft-modal="example-modal"]');
      $closeButton = $('button[data-ft-modal-close]');
      $shade = $('.shade');
    });

    it('is not visible by default', function(){
      expect($shade).not.toBeVisible();
      expect($modal).not.toBeVisible();
    });

    it('shows modal on data-ft-modal click', function(done){
      $button.trigger('click');
      _.multiCallback([
        ['opened.ft.shade', $shade],
        ['opened.ft.modal', $modal]
      ]).then(function(){
        expect($shade).toBeVisible();
        expect($modal).toBeVisible();
        done();
      });
    });

    it('hides modal on data-ft-modal-close click', function(done){
      $modal.trigger('open.ft.modal');
      $modal.on('opened.ft.modal', function(){
        $closeButton.trigger('click');
      });

      _.multiCallback([
        ['closed.ft.shade', $shade],
        ['closed.ft.modal', $modal]
      ]).then(function(){
        expect($shade).not.toBeVisible();
        expect($modal).not.toBeVisible();
        done();
      });

    });

    it('hides modal on .shade click', function(done){
      $modal.trigger('open.ft.modal');
      $modal.on('opened.ft.modal', function(){
        $shade.trigger('click');
      });

      _.multiCallback([
        ['closed.ft.shade', $shade],
        ['closed.ft.modal', $modal]
      ]).then(function(){
        expect($shade).not.toBeVisible();
        expect($modal).not.toBeVisible();
        done();
      });
    });
  });

})(jQuery);
