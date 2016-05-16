/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class SettingsController {

    menu = [
        { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
        { name: 'Euro2016', href: '/news', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
        { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
        { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
    ];

    constructor(Auth) {
        this.errors = {};
        this.submitted = false;
        this.Auth = Auth;
        this.getCurrentUser = Auth.getCurrentUser;
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
}

angular.module('euroProno2016WebApp')
    .controller('SettingsController', SettingsController);
