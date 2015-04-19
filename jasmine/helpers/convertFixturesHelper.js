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

          bareName = name.replace('data-', '');

          if(bareName !== name){
            if(!value){ value = true; }
            $this.removeAttr(name);
            $this.attr(bareName, value);
          }
        });
      });
    },

    runWithDataAndBare: function(context, examples){
      describe(context.spec, function(){

        beforeEach(function(){
          loadFixtures(context.fixture);
        });

        examples(context);

        describe(context.spec + ' with bare attributes', function(){
          var newContext = {};

          beforeEach(function(){
            _.forOwn(context, function(val, key){
              var bare = val.replace('data-', '');

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
