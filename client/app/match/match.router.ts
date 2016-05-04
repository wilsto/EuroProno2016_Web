'use strict';

angular.module('euroProno2016WebApp.matchs')
    .config(function($stateProvider) {
        $stateProvider
            .state('match', {
                url: '/match',
                templateUrl: 'app/match/match.html',
                controller: 'MatchController',
                controllerAs: 'vm'
            });
    });
