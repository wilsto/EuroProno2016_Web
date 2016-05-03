'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('traduction', {
                url: '/traduction',
                template: '<traduction></traduction>',
                authenticate: 'admin'
            });
    });
