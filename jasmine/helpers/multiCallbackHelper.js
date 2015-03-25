(function(_){
  // 'use strict';

  _.mixin({
    multiCallback: function(elementArr){
      var deferred = $.Deferred(),
          finished = [];

      _.forEach(elementArr, function(spec){
        var eventName = spec[0],
            $element  = spec[1];

        $element.on(eventName, function(){
          finished.push([eventName, $element]);
          if(finished.length === elementArr.length){
            deferred.resolve(finished);
          }
        });
      });

      return deferred.promise();
    }
  });
})(_);
