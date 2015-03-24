(function($){
  'use strict';
  
  describe(".modal", function(){
    var $modal, $button, $shade, $closeButton;
    
    beforeEach(function(){
      loadFixtures('modalFixture.html');
      $modal = $('.modal');
      $button = $('button[data-ft-modal]');
      $closeButton = $('button[data-ft-modal-close]');
      $shade = $('.shade');
    });

    it('is not visible by default', function(){
      expect($shade).not.toBeVisible();
      expect($modal).not.toBeVisible();
    });

    it('shows modal on data-ft-modal click', function(){
      $button.trigger('click');
      expect($shade).toBeVisible();
      expect($modal).toBeVisible();
    });

    it('hides modal on data-ft-modal-close click', function(){
      $modal.trigger('open.ft.modal');
      $closeButton.trigger('click');
      expect($shade).not.toBeVisible();
      expect($modal).not.toBeVisible();
    });

    it('hides modal on .shade click', function(){
      $modal.trigger('open.ft.modal');
      $shade.trigger('click');
      expect($shade).not.toBeVisible();
      expect($modal).not.toBeVisible();
    });
  });

})(jQuery);