'use strict';
(function(){

class Euro2016Component {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('euroProno2016WebApp')
  .component('euro2016', {
    templateUrl: 'app/euro2016/euro2016.html',
    controller: Euro2016Component
  });

})();
