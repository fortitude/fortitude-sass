(function($){
  'use strict';

  describe(".navigationbar", function(){
    var $navbar, $shade;

    beforeEach(function(){
      loadFixtures('navigationbarFixture.html');
      $navbar = $('[ft-navigationbar]');
      $shade = $('[ft-shade]');
    });

    it('does not have the shade open by default', function(){
      expect($shade).not.toBeVisible();
    });

    it('opens the shade when toggle helper checked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('opened.ft.shade', function(){
        expect($shade).toBeVisible();
        done();
      });
    });

    it('closes the shade when toggle helper unchecked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('closed.ft.shade', function(){
        expect($shade).not.toBeVisible();
        done();
      });
    });
  });

  describe(".navigationbar data attributes", function(){
    var $navbar, $shade;

    beforeEach(function(){
      loadFixtures('navigationbarDataFixture.html');
      $navbar = $('[data-ft-navigationbar]');
      $shade = $('[data-ft-shade]');
    });

    it('does not have the shade open by default', function(){
      expect($shade).not.toBeVisible();
    });

    it('opens the shade when toggle helper checked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('opened.ft.shade', function(){
        expect($shade).toBeVisible();
        done();
      });
    });

    it('closes the shade when toggle helper unchecked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('closed.ft.shade', function(){
        expect($shade).not.toBeVisible();
        done();
      });
    });
  });
})(jQuery);
