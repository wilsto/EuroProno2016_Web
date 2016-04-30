/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class ForgotController {
    constructor(Auth, $state) {
        this.user = {};
        this.errors = {};
        this.submitted = false;

        this.Auth = Auth;
        this.$state = $state;

    }

    forgot(form) {
        this.submitted = true;
        if (form.$valid) {
            this.$http.get('/auth/forgot', {
                    email: this.user.email
                })
                .then(() => {

                })
                .catch(err => {
                    this.errors.other = err.message;
                });
        }
    }
}

angular.module('euroProno2016WebApp')
    .controller('ForgotController', ForgotController);
