'use strict';

angular.module('euroProno2016WebApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('news', {
                url: '/news',
                template: '<news></news>'
            });
    });
