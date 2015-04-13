(function($){
  'use strict';

  describe('$.ftGetTarget', function(){
    var $withPound, $withoutPound, $missingField, $target;

    beforeEach(function(){
      loadFixtures('getTargetFixture.html');
      $withPound = $('#with-pound');
      $withoutPound = $('#without-pound');
      $missingField = $('#missing-field');
      $target = $('#target-id');
    });

    it('finds the target without pound sign', function(){
      expect($.ftGetTarget($withPound, 'ft-example').is($target)).toEqual(true);
    });

    it('finds the target with pound sign', function(){
      expect($.ftGetTarget($withoutPound, 'ft-example').is($target)).toEqual(true);
    });

    it('returns empty jQuery when field not found', function(){
      expect($.ftGetTarget($missingField, 'ft-example').length).toEqual(0);
    });
  });

  describe('$.ftGetTarget bare attributes', function(){
    var $withPound, $withoutPound, $missingField, $target;

    beforeEach(function(){
      loadFixtures('getTargetFixture.html');
      $withPound = $('#bare-with-pound');
      $withoutPound = $('#bare-without-pound');
      $missingField = $('#missing-field');
      $target = $('#target-id');
    });

    it('finds the target without pound sign', function(){
      expect($.ftGetTarget($withPound, 'ft-example').is($target)).toEqual(true);
    });

    it('finds the target with pound sign', function(){
      expect($.ftGetTarget($withoutPound, 'ft-example').is($target)).toEqual(true);
    });

    it('returns empty jQuery when field not found', function(){
      expect($.ftGetTarget($missingField, 'ft-example').length).toEqual(0);
    });
  });

})(jQuery);
