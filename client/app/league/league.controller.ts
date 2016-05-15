'use strict';
(function(){

class LeagueComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('euroProno2016WebApp')
  .component('league', {
    templateUrl: 'app/league/league.html',
    controller: LeagueComponent
  });

})();
