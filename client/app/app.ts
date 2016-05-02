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
        'pascalprecht.translate'
    ])
    .config(function($urlRouterProvider, $locationProvider, $translateProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $translateProvider.translations('fr', {
            'sort by Name': 'Trier par nom',
            'sort by Group': 'Trier par groupe',
            'Group': 'Groupe',
            'BUTTON_LANG_EN': 'english',
            'BUTTON_LANG_FR': 'french',
            //Pays
            'Albania': 'Albanie',
            'Austria': 'Autriche',
            'Belgium': 'Belgique',
            'Croatia': 'Croatie',
            'Czech Republic': 'République Tchèque',
            'England': 'Angleterre',
            'Germany': 'Allemagne',
            'Hungary': 'Hongrie',
            'Iceland': 'Islande',
            'Italy': 'Italie',
            'Northern Irland': 'Irlande du nord',
            'Republic of Irland': 'République d Irlande',
            'Spain': 'Espagne',
            'Wales': 'Pays de Galles',
            'Romania': 'Roumanie',
            'Russia': 'Russie',
            'Slovakia': 'Slovaquie',
            'Sweden': 'Suède',
            'Switzerland': 'Suisse',
            'Turkey': 'Turquie',
            'Poland': 'Pologne',
            'Day 1': 'Jour 1',
            'Day 2': 'Jour 2',
            'Day 3': 'Jour 3'
        });

        $translateProvider.preferredLanguage('en');

    });
