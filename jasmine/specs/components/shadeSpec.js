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
      $('[ft-shade-show]').trigger('click');
      $shade.on('shown.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-shown');
        expect($shade).toBeVisible();
        done();
      });
    });

    it('hides when clicked on', function(done){
      $shade.trigger('show.ft.shade');
      $shade.on('shown.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-shown');
        $shade.trigger('click');
      });

      $shade.on('hidden.ft.shade', function(){
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
      $('[data-ft-shade-show]').trigger('click');
      $shade.on('shown.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-shown');
        expect($shade).toBeVisible();
        done();
      });
    });

    it('hides when clicked on', function(done){
      $shade.trigger('show.ft.shade');
      $shade.on('shown.ft.shade', function(){
        expect($shade).toHaveClass('shade--is-shown');
        $shade.trigger('click');
      });

      $shade.on('hidden.ft.shade', function(){
        expect($shade).not.toBeVisible();
        done();
      });
    });
  });
})(jQuery);
