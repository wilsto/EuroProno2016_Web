'use strict';

class SignupController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $state, $http) {
        this.Auth = Auth;
        this.$http = $http;
        this.$state = $state;
        this.getCurrentUser = Auth.getCurrentUser;
    }

    register(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Auth.createUser({
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    this.$http.get('/api/users/me').then(response => {
                        this.$http.put('/api/leagues/57421c4678c0540300082c97/members', { user: response.data._id, validated: true }).then(response2 => {
                            console.log('league updated');
                            // Account created, redirect to home
                            this.$state.go('main');
                        });
                    });

                })
                .catch(err => {
                    err = err.data;
                    this.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, (error, field) => {
                        form[field].$setValidity('mongoose', false);
                        this.errors[field] = error.message;
                    });
                });
        }
    }
}

angular.module('euroProno2016WebApp')
    .controller('SignupController', SignupController);
