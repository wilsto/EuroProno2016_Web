/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class SettingsController {

    menu = [
        { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
        { name: 'Euro2016', href: '/news', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
        { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
        { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
    ];

    constructor(Auth, $http) {
        this.errors = {};
        this.submitted = false;
        this.Auth = Auth;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$http = $http;
        this.leagues = [];
        this.focused = false;
        //users information
        this.users = this.getCurrentUser();
        this.status = this.users.status;

        //on récupère les leagues
        this.$http.get('/api/leagues').then(responseLeagues => {
            this.leagues = responseLeagues.data;
        });

    }

    changePassword(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.message = 'Password successfully changed.';
                })
                .catch(() => {
                    form.password.$setValidity('mongoose', false);
                    this.errors.other = 'Incorrect password';
                    this.message = '';
                });
        }
    }


    updUser(form) {
        this.submitted = true;
        if (form.$valid) {
            this.status.profil = 1;
            this.users.status = this.status;
            this.$http.put('/api/users/' + this.users._id, this.users).then(response => {
                console.log('user updated', response);
            });


        }
        this.focused = false;
    }
}

angular.module('euroProno2016WebApp')
    .controller('SettingsController', SettingsController);
