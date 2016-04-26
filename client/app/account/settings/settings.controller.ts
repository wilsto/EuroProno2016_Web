/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class SettingsController {
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
