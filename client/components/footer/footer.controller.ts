'use strict';

class FooterController {

    constructor($rootScope, $translate) {
        this.$rootScope = $rootScope;
        this.$translate = $translate;
    }

    $onInit() {
        console.log('init Footer');
        this.lang = this.$rootScope.language;
    }

    changeLanguage(lang) {
        this.$rootScope.language = lang;
        this.lang = lang;
        this.$translate.use(lang);
    }
}

angular.module('euroProno2016WebApp')
    .controller('FooterController', FooterController);
