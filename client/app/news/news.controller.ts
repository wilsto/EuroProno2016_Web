'use strict';
(function() {

    class NewsComponent {
        constructor() {
            this.message = 'Hello';
        }
    }

    angular.module('euroProno2016WebApp')
        .component('news', {
            templateUrl: 'app/news/news.html',
            controller: NewsComponent,
            controllerAS: 'vm'
        });

})();
