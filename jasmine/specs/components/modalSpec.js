(function($){
  'use strict';

  describe(".modal", function(){
    var $modal, $button, $shade, $hideButton;

    beforeEach(function(){
      loadFixtures('modalFixture.html');
      $modal = $('#example-modal');
      $button = $('button[ft-modal-show="example-modal"]');
      $hideButton = $('button[ft-modal-hide]');
      $shade = $('.shade');
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
  });

  describe(".modal data attrs", function(){
    var $modal, $button, $shade, $hideButton;

    beforeEach(function(){
      loadFixtures('modalDataFixture.html');
      $modal = $('#example-modal');
      $button = $('button[data-ft-modal-show="example-modal"]');
      $hideButton = $('button[data-ft-modal-hide]');
      $shade = $('[data-ft-shade]');
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
  });

})(jQuery);
