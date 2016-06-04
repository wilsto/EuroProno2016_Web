'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('regulation', {
                url: '/regulation',
                template: '<regulation></regulation>'
            });
    });
