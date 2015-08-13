(function($){
  'use strict';

  var runTargetExamples = function(context){
    describe('$.fn.ftTarget', function(){
      var $withPound, $withoutPound, $missingField, $target;

      beforeEach(function(){
        $withPound = $(context.withPound);
        $withoutPound = $(context.withoutPound);
        $missingField = $(context.missingField);
        $target = $(context.target);
      });

      it('finds the target without pound sign', function(){
        expect($withPound.ftTarget('ft-example').is($target)).toEqual(true);
      });

      it('finds the target with pound sign', function(){
        expect($withoutPound.ftTarget('ft-example').is($target)).toEqual(true);
      });

      it('returns empty jQuery when field not found', function(){
        expect($missingField.ftTarget('ft-example').length).toEqual(0);
      });
    });
  };

  _.runWithDataAndBare({
    spec: '$.fn.ftTarget',
    fixture: 'targetDataFixture.html',
    withPound: '#with-pound',
    withoutPound: '#without-pound',
    missingField: '#missing-field',
    target: '#target-id'
  }, runTargetExamples);

})(jQuery);
