(function($){
  'use strict';

  describe('$.measureScrollBar', function(){
 
    beforeEach(function(){
      loadFixtures('measureScrollBarFixture.html');
    });

    // can't test in a headless browser
    // just ensuring this doesn't raise an error
    it('gets scrollbar width', function(){
      var fullHtml = $(document.body).html();
      expect($.measureScrollBar()).toEqual(0);
      expect($(document.body).html()).toEqual(fullHtml);
    });
  });

})(jQuery);