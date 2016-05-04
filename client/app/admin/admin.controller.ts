'use strict';

(function() {

    class AdminController {

        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Traduction', href: '/traduction', section: '', ngclick: '', class: 'active', a_class: 'nothing' }
        ];

        constructor(User) {
            // Use the User $resource to fetch all users
            this.users = User.query();
        }

        delete(user) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
        }
    }

    angular.module('euroProno2016WebApp.admin')
        .controller('AdminController', AdminController);

})();
