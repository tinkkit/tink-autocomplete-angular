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

        ctrl.setModelData = function(data){
          $scope.ngModel = data;
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

        

      transclude(function(transcludeEl) {
        var divTransclude = element.find('.tinkNgRepeatTransclude');
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
