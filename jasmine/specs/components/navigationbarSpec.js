(function($){
  'use strict';

  var runNavigationBarExamples = function(context){
    describe(".navigationbar", function(){
      var $navbar, $toggle, $nav, $html,
          showClass = 'navigationbar__nav--is-shown',
          hideClass = 'navigationbar__nav--is-hidden';

      beforeEach(function(){
        $navbar = $(context.navbar);
        $toggle = $(context.toggle);
        $nav = $(context.nav);
        $html = $('html');
      });

      it('is not visible by default', function(){
        expect($nav).not.toBeVisible();
      });

      it('shows the navbar when clicked', function(done){
        $toggle.trigger('click');

        $navbar.on('shown.ft.navigationbar', function(){
          expect($nav).toHaveClass(showClass);
          expect($nav).not.toHaveClass(hideClass);
          expect($nav).toBeVisible();
          done();
        });
      });

      it('hides the navbar when clicked again', function(done){
        $toggle.trigger('click');

        $navbar.on('shown.ft.navigationbar', function(){
          $toggle.trigger('click');
        });

        $navbar.on('hidden.ft.navigationbar', function(){
          expect($nav).not.toHaveClass(showClass);
          expect($nav).toHaveClass(hideClass);
          expect($nav).not.toBeVisible();
          done();
        });
      });
    });
  };

  _.runWithDataAndBare({
    fixture: 'navigationbarDataFixture.html',
    navbar: '[data-ft-navigationbar]',
    toggle: '[data-ft-navigationbar-toggle]',
    nav: '[data-ft-navigationbar-nav]'
  }, runNavigationBarExamples);

})(jQuery);
