(function($){
  'use strict';

  var runSelectInputExamples = function(context){
    describe('.select-input data attrs', function(){
      var $select, $noPlaceholder;

      beforeEach(function(){
        $select = $(context.select);
        $noPlaceholder = $(context.noPlaceholder);
        $(document).trigger('setup.ft.select');
      });

      it('shows the default options class by default', function(){
        expect($select).toHaveClass('select-input');
        expect($select).toHaveClass('placeholder');
      });

      it('removes the class when the option changes', function(){
        $select.val(2).trigger('change');
        expect($select).toHaveClass('select-input');
        expect($select).not.toHaveClass('placeholder');
      });

      it('does not set placeholders when no classes present', function(){
        expect($noPlaceholder).not.toHaveClass('placeholder');
        $noPlaceholder.val(2).trigger('change');
        expect($noPlaceholder).not.toHaveClass('placeholder');
      });
    });
  };

  _.runWithDataAndBare({
    spec: '.select-input',
    fixture: 'selectInputDataFixture.html',
    select: '#select-with-placeholder',
    noPlaceholder: '#select-without-placeholder'
  }, runSelectInputExamples);

})(jQuery);
