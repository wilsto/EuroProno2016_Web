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

        /*        if (form.$valid) {
                    this.Auth.login({
                            email: this.user.email,
                            password: this.user.password
                        })
                        .then(() => {
                            // Logged in, redirect to home
                            this.$state.go('main');
                        })
                        .catch(err => {
                            this.errors.other = err.message;
                        });
                }*/
    }
}

angular.module('euroProno2016WebApp')
    .controller('ForgotController', ForgotController);
