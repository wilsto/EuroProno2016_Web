/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

        class NewsComponent {

            menu = [
                { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
                { name: 'Admin Users', href: '/admin', section: '', ngclick: '', class: 'active', a_class: 'nothing' }
            ];

            constructor($http, $ngBootbox) {
                this.$ngBootbox = $ngBootbox;
                this.$http = $http;
                this.news = [];
                this.typOnes = [];
                this.currentPage = 1;
                this.itemsPerPage = 2;
                this.bigTotalItems = 100;
                this.maxSize = 5;
                this.bigCurrentPage = 1;
            }

            $onInit() {
                    console.log('init');
                    // on récupère les pronos du joueur sinon on crèe le squelette
                    this.$http.get('/api/newss').then(response => {
                        try {

                            this.news = response.data;

                            this.typOnes = _.filter(this.news, function(o) {
                                return o.type === "1";
                            });

                            this.totalOne = this.typOnes.length;

                            var paginate[];
                            var it;
                            for (it = 0; it < this.totalOne / this.itemsPerPage; it++) {
                                // Ceci sera exécuté 5 fois
                                // la variable "pas" ira de 0 à 4
                                paginate.push({ "numpag": it + 1 });
                            }
                            this.paginate = paginate;


                            // création des groupes à partir des infos news
                            this.types = _.sortBy(_.uniq(_.map(this.news, element => {
                                return { type: element.type, order: element.type, group: element.group };
                            }), 'type'), 'order');

                            this.pageChanged(1);
                            this.pageCount();

                        } catch (err) {
                            console.log('vide');
                        }
                    });
                }
                // create news 
            createNews(form) {
                // si trad existe déjà
                console.log(form.$valid);
                if (form.$valid) {

                    this.$http.post('/api/newss', {
                        type: this.newinfo.type,
                        group: this.newinfo.group,
                        title: this.newinfo.title,
                        info: this.newinfo.info,
                        image: this.newinfo.image
                    }).then(response => {
                        this.newinfo.type = '';
                        this.newinfo.group = '';
                        this.newinfo.title = '';
                        this.newinfo.info = '';
                        this.newinfo.image = '';
                    });
                }
            }

            pageCount() {
                return Math.ceil(this.totalOne / this.itemsPerPage);
            };

            pageChanged(current) {
                this.currentPage = current;
                console.log("filter", current);
                var begin = ((this.currentPage - 1) * this.itemsPerPage),
                    end = begin + this.itemsPerPage;
                this.filteredNewsOne = this.typOnes.slice(begin, end);

            });

        delete(news, index) {
            this.news.splice(index, 1);
            this.$http.delete('/api/newss/' + news._id).then(response => {
                console.log('delete', response);
            });
        }

    }

    angular.module('euroProno2016WebApp')
    .component('news', {
        templateUrl: 'app/news/news.html',
        controller: NewsComponent,
        controllerAs: 'vm'
    });

})();
