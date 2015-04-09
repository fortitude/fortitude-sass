(function($){
  'use strict';

  describe(".modal", function(){
    var $modal, $button, $shade, $closeButton;

    beforeEach(function(){
      loadFixtures('modalFixture.html');
      $modal = $('#example-modal');
      $button = $('button[ft-modal-open="example-modal"]');
      $closeButton = $('button[ft-modal-close]');
      $shade = $('.shade');
    });

    it('is not visible by default', function(){
      expect($shade).not.toBeVisible();
      expect($modal).not.toBeVisible();
    });

    it('shows modal on ft-modal-open click', function(done){
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

    it('hides modal on ft-modal-close click', function(done){
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

  describe(".modal data attrs", function(){
    var $modal, $button, $shade, $closeButton;

    beforeEach(function(){
      loadFixtures('modalDataFixture.html');
      $modal = $('#example-modal');
      $button = $('button[data-ft-modal-open="example-modal"]');
      $closeButton = $('button[data-ft-modal-close]');
      $shade = $('[data-ft-shade]');
    });

    it('is not visible by default', function(){
      expect($shade).not.toBeVisible();
      expect($modal).not.toBeVisible();
    });

    it('shows modal on ft-modal-open click', function(done){
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

    it('hides modal on ft-modal-close click', function(done){
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
