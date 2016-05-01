/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

class ResetController {
    constructor(Auth, $state, $http, $stateParams) {
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.Auth = Auth;
        this.$state = $state;

        this.user = {};
        this.errors = {};
        this.submitted = false;
    }

    reset(form) {
        this.submitted = true;
        if (form.$valid) {
            this.token = this.$stateParams.token;

            if (this.user.password && this.user.confirm) {
                this.$http.get('/auth/reset', {
                        params: {
                            password: this.user.password,
                            confirm: this.user.confirm,
                            token: this.token
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
            } else {
                this.message = 'Please enter the same password twice';
            }
        }
    }
}

angular.module('euroProno2016WebApp')
    .controller('ResetController', ResetController);
