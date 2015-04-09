(function($){
  'use strict';

  describe('$.fn.ftTarget', function(){
    var $withPound, $withoutPound, $missingField, $target;

    beforeEach(function(){
      loadFixtures('targetDataFixture.html');
      $withPound = $('#with-pound');
      $withoutPound = $('#without-pound');
      $missingField = $('#missing-field');
      $target = $('#target-id');
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

  describe('$.fn.ftTarget bare attributes', function(){
    var $withPound, $withoutPound, $missingField, $target;

    beforeEach(function(){
      loadFixtures('targetFixture.html');
      $withPound = $('#with-pound');
      $withoutPound = $('#without-pound');
      $missingField = $('#missing-field');
      $target = $('#target-id');
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

})(jQuery);
