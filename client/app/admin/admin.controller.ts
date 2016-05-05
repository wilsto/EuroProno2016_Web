/// <reference path="../../typings/tsd.d.ts" />
'use strict';

(function() {

    class AdminController {

        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Traduction', href: '/traduction', section: '', ngclick: '', class: 'active', a_class: 'nothing' }
        ];

        constructor(User, $http, $ngBootbox) {
            var that = this;
            this.$ngBootbox = $ngBootbox;
            this.$http = $http;
            this.users = [];
            this.filterBln = true;
            // Use the User $resource to fetch all users
            User.query().$promise.then(function(users) {
                that.users = _.map(users, function(user) {
                    user.active = user._id !== undefined;
                    return user; // case insensitive
                });

                that.users = _.sortBy(users, function(user) {
                    return user.name.toLowerCase(); // case insensitive
                });
            });
        }

        showFilter() {
            this.filterBln = !this.filterBln;
        }

        userChange(user) {
            user.active = false;
        }

        delete(user) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
        }

        //sauvegarde les pronos
        save(trad) {
            // si trad existe déjà
            trad.active = true;
            if (trad._id) {
                this.$http.put('/api/traductions/' + trad._id, trad).then(response => {
                    trad = response.data;
                });
            } else {
                // sinon on crèe les trads
                this.$http.post('/api/traductions', trad).then(response => {
                    trad = response.data;
                });
            }
        }

    }

    angular.module('euroProno2016WebApp.admin')
        .controller('AdminController', AdminController);

})();
