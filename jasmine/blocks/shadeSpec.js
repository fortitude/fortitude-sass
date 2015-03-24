(function($){
  'use strict';
  
  describe(".shade", function(){
    var $shade;
    
    beforeEach(function(){
      loadFixtures('shadeFixture.html');
      $shade = $('.shade');
    });

    it("is not immediately visible", function(){
      expect($shade).not.toBeVisible();
    });

    it("is visible after event trigger", function(){
      var openSpy = spyOnEvent($shade, 'open.ft.shade');
      $('[data-ft-shade]').trigger('click');
      expect(openSpy).toHaveBeenTriggered();
      expect($shade).toHaveClass('shade--is-active');
      expect($shade).toBeVisible();
    });

    it("closes when clicked on", function(){
      var openSpy = spyOnEvent($shade, 'open.ft.shade'),
          closeSpy = spyOnEvent($shade, 'close.ft.shade');
      
      $shade.trigger('open.ft.shade');
      expect(openSpy).toHaveBeenTriggered();
      expect($shade).toHaveClass('shade--is-active');
      
      $shade.trigger('click');
      expect(closeSpy).toHaveBeenTriggered();
      expect($shade).not.toBeVisible();
    });
  });
})(jQuery);