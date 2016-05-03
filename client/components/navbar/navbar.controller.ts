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
        //recherche de langue pour un user sinon language par défaut du navigateur sinon anglais
        var that = this;
        this.getCurrentUser(function(me) {
            that.$translate.use(me.lang || navigator.language || navigator.userLanguage);
        });

    }
}

angular.module('euroProno2016WebApp')
    .controller('NavbarController', NavbarController);
