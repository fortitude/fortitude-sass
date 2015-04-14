(function($){
  'use strict';

  describe('.shade', function(){
    var $shade;

    beforeEach(function(){
      loadFixtures('shadeFixture.html');
      $shade = $('[ft-shade]');
    });

    it('is not immediately visible', function(){
      expect($shade).not.toBeVisible();
    });

    it('is visible after event trigger', function(done){
      $('[ft-shade-open]').trigger('click');
      $shade.on('opened.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-active');
        expect($shade).toBeVisible();
        done();
      });
    });

    it('closes when clicked on', function(done){
      $shade.trigger('open.ft.shade');
      $shade.on('opened.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-active');
        $shade.trigger('click');
      });

      $shade.on('closed.ft.shade', function(){
        expect($shade).not.toBeVisible();
        done();
      });
    });
  });

  describe('with data-ft-shade attributes', function(){
    var $shade;

    beforeEach(function(){
      loadFixtures('shadeDataFixture.html');
      $shade = $('[data-ft-shade]');
    });

    it('is not immediately visible', function(){
      expect($shade).not.toBeVisible();
    });

    it('is visible after event trigger', function(done){
      $('[data-ft-shade-open]').trigger('click');
      $shade.on('opened.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-active');
        expect($shade).toBeVisible();
        done();
      });
    });

    it('closes when clicked on', function(done){
      $shade.trigger('open.ft.shade');
      $shade.on('opened.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-active');
        $shade.trigger('click');
      });

      $shade.on('closed.ft.shade', function(){
        expect($shade).not.toBeVisible();
        done();
      });
    });
  });
})(jQuery);
