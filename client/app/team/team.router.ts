'use strict';

angular.module('euroProno2016WebApp.teams')
  .config(function($stateProvider) {
    $stateProvider
      .state('team', {
        url: '/team',
        templateUrl: 'app/team/team.html',
        controller: 'TeamController',
        controllerAs: 'vm',
        authenticate: 'team'
      });
  });
