(function(_){
  // 'use strict';

  _.mixin({
    convertFixtures: function(){
      $('#jasmine-fixtures').find('*').each(function(){
        var $this = $(this),
            attributes = {};

        _.forEach($this[0].attributes, function(attr){
          var name = attr.name,
              value = $this.attr(name),
              bareName;

          bareName = _.dataToBare(name);

          if(bareName !== name){
            $this.removeAttr(name);
            $this.attr(bareName, value);
          }
        });
      });
    },

    dataToBare: function(str){
      var match = _.toString(str).match(/data-/i);

      if(match){
        return str.replace('data-', '');
      } else {
        return str;
      }
    },

    runWithDataAndBare: function(context, examples){
      describe('with data attrs', function(){

        beforeEach(function(){
          loadFixtures(context.fixture);
        });

        examples(context);

        describe('with bare attributes', function(){
          var newContext = {};

          beforeEach(function(){
            _.forOwn(context, function(val, key){
              var bare = _.dataToBare(key);

              if(bare !== key){
                newContext[key] = bare;
              } else {
                newContext[key] = val;
              }
            });

            _.convertFixtures();
          });

          examples(newContext);
        });
      });
    }
  });
})(_);
