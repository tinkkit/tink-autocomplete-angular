'use strict';
(function(module) {
  try {
    module = angular.module('tink.autocomplete');
  } catch (e) {
    module = angular.module('tink.autocomplete', []);
  }
  module.directive('tinkAutocomplete', ['$compile',function ($compile) {
    return {
      restrict: 'EA',
      scope: {
        ngModel: '=?',
        tinkHighlightLength:'=?',
        tinkArray:'=?',
        tinkFilterOn:'@'
      },
      transclude:true,
      templateUrl: 'templates/autocomplete.html',
      controller:function($scope){
        var ctrl = this;
        ctrl.inputValue = "";

        $scope.$watch('tinkArray',function(value){
          ctrl.visibleData = value;
        })
        ctrl.inputChange = function(){

        }

        ctrl.keyUp = function(event){return false;

        }

        ctrl.keyDown = function(event){
          var keyCode = event.which;


        }

        ctrl.filterValues = function(data){
          data = eval('data.'+$scope.tinkFilterOn);
          if(data && ctrl.inputValue !== '' && ctrl.inputValue && ctrl.inputValue.length >= $scope.tinkHighlightLength){
            try{
              var inText = data.toLowerCase().indexOf(ctrl.inputValue.toLowerCase());
              return inText > -1;
            }catch(e) {
              return false;
            }
          }
          return false;
        }

        ctrl.setModelData = function($event,data){
          $scope.ngModel = data;
          ctrl.inputValue = eval('data.'+$scope.tinkFilterOn);
        };

        //to see if the value is numeric
        function isNumeric(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }


        function init(){
          if(!isNumeric(parseFloat($scope.tinkHighlightLength))){
            $scope.tinkHighlightLength = 3;
          }
        }

        init();
      },
      controllerAs:'ctrl',
      link: function(scope,element,atrr,ctrl,transclude) {

      var input = element.find('input');
      input.focus(function(){
        element.find('.list-autocomplete').addClass('show');
      })
      input.blur(function(){
        element.find('.list-autocomplete').removeClass('show');
      })

      input.keydown(function(evt) {
        console.log(evt);
        return ctrl.keyDown(evt);
      });

      transclude(function(transcludeEl) {
        var divTransclude = element.find('.list-result-autocomplete');
        divTransclude.append(transcludeEl);
        divTransclude.attr('ng-repeat',"tinkArray in ctrl.visibleData | filter:ctrl.filterValues track by $index");
        var html = divTransclude.html().replace('| highlight','| highlight:ctrl.inputValue');
        divTransclude.html(html);
        $compile(divTransclude)(scope);
      });

      }
    };
  }]).filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<mark>$1</mark>')

      return $sce.trustAsHtml(text)
    }
  });
})();
;angular.module('tink.autocomplete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/autocomplete.html',
    "<div class=autocomplete> <input ng-keyup=ctrl.keyDown($event) ng-change=ctrl.inputChange() ng-model=ctrl.inputValue placeholder=\"\"> <ul class=list-autocomplete><li tabindex=0 class=list-result-autocomplete ng-mousedown=ctrl.setModelData($event,tinkArray)></li></ul> </div>"
  );

}]);
