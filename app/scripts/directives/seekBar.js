(function() {
  function seekBar($document) {
    /*
    * continuously keep track of % offset
    */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };


    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        /*
        * private method
        * @desc = assign seekBar to $(element)
        */
        var seekBar = $(element);

        /*
        *private function
        */
        var percentString = function(){
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /*
        *public function
        *returns width CSS style
        */
        scope.fillStyle = function() {
          return {width: percentString()};
        };
          
        scope.thumbStyle = function () {
            return {left: percentString()};
        };

        /*
        * updates scope.value
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        scope.trackThumb = function() {
           $document.bind('mousemove.thumb', function(event) {
               var percent = calculatePercent(seekBar, event);
               scope.$apply(function() {
                   scope.value = percent * scope.max;
               });
           });

           $document.bind('mouseup.thumb', function() {
               $document.unbind('mousemove.thumb');
               $document.unbind('mouseup.thumb');
           });
       };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();