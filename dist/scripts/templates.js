angular.module('tink.autocomplete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/autocomplete.html',
    "<div> <input ng-change=ctrl.inputChange() ng-model=ctrl.inputValue id=input-text placeholder=\"input[type=&quot;text&quot;]\"> <div class=tinkAutoComplete> <div class=tinkNgRepeatTransclude ng-mousedown=ctrl.setModelData($event,tinkArray)> </div> </div> </div>"
  );

}]);
