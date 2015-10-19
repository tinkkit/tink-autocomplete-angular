angular.module('tink.autocomplete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/autocomplete.html',
    "<div class=autocomplete> <input ng-change=ctrl.inputChange() ng-model=ctrl.inputValue placeholder=\"\"> <ul class=list-autocomplete><li class=list-result-autocomplete ng-mousedown=ctrl.setModelData($event,tinkArray)></li></ul> </div>"
  );

}]);
