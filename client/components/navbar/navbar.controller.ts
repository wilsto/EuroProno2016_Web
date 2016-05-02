'use strict';

class NavbarController {
    //start-non-standard
    menu = [{
        'title': 'Home',
        'state': 'main'
    }];

    isCollapsed = true;
    //end-non-standard

    constructor($http, Auth, $translate) {
        this.$http = $http;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$translate = $translate;
        //TODO   ajouter recherche de langue pour un user
        this.lang = navigator.language || navigator.userLanguage;
        this.$translate.use(this.lang);
    }
}

angular.module('euroProno2016WebApp')
    .controller('NavbarController', NavbarController);
