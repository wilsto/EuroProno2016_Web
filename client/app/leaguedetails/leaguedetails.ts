'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('leaguedetails', {
                url: '/leaguedetails/:id',
                template: '<leaguedetails></leaguedetails>'
            });
    });
