(function($){
  'use strict';
  
  describe(".navigationbar", function(){
    var $navbar, $shade;
    
    beforeEach(function(){
      loadFixtures('navigationbarFixture.html');
      $navbar = $('.navigationbar');
      $shade = $('.shade');
    });

    it('does not have the shade open by default', function(){
      expect($shade).not.toBeVisible();
    });

    it('opens the shade when toggle helper checked', function(){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      expect($shade).toBeVisible();
    });

    it('closes the shade when toggle helper unchecked', function(){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      expect($shade).not.toBeVisible();
    });
  });
})(jQuery);