/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class ForgotController {
    constructor(Auth, $state, $http) {
        this.$http = $http;
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
                    params: {
                        email: this.user.email,
                    }
                })
                .then(response => {
                    console.log('data', response.data);
                    this.message = response.data;
                })
                .catch(err => {
                    console.log('err', err);
                    this.errors.other = err.message || err.status + ' ' + err.statusText;
                });
        }
    }
}

angular.module('euroProno2016WebApp')
    .controller('ForgotController', ForgotController);
