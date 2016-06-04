'use strict';

angular.module('euroProno2016WebApp', [
        'euroProno2016WebApp.auth',
        'euroProno2016WebApp.admin',
        'euroProno2016WebApp.constants',
        'euroProno2016WebApp.teams',
        'euroProno2016WebApp.matchs',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'ui.bootstrap',
        'validation.match',
        'angular.filter',
        'pascalprecht.translate',
        'ngBootbox',
        'flow',
        'chart.js'
    ])
    .config(function($urlRouterProvider, $locationProvider, $translateProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $translateProvider.useUrlLoader('/api/traductions/loader');
        $translateProvider.preferredLanguage(navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2) || 'en');

    })
    .run(function($rootScope) {
        $rootScope.language = navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2) || 'en';
    });
