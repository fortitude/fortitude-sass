(function($){
  'use strict';

  describe(".navigationbar", function(){
    var $navbar, $shade;

    beforeEach(function(){
      loadFixtures('navigationbarFixture.html');
      $navbar = $('[ft-navigationbar]');
      $shade = $('[ft-shade]');
    });

    it('does not have the shade shown by default', function(){
      expect($shade).not.toBeVisible();
    });

    it('shows the shade when toggle helper checked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('shown.ft.shade', function(){
        expect($shade).toBeVisible();
        expect($('html')).toHaveClass('html--is-locked');
        done();
      });
    });

    it('hides the shade when toggle helper unchecked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('hidden.ft.shade', function(){
        expect($shade).not.toBeVisible();
        expect($('html')).not.toHaveClass('html--is-locked');
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

    it('does not have the shade shown by default', function(){
      expect($shade).not.toBeVisible();
    });

    it('shows the shade when toggle helper checked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('shown.ft.shade', function(){
        expect($shade).toBeVisible();
        expect($('html')).toHaveClass('html--is-locked');
        done();
      });
    });

    it('hides the shade when toggle helper unchecked', function(done){
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $navbar.find('.navigationbar__toggle__helper').trigger('click');
      $shade.on('hidden.ft.shade', function(){
        expect($shade).not.toBeVisible();
        expect($('html')).not.toHaveClass('html--is-locked');
        done();
      });
    });
  });
})(jQuery);
