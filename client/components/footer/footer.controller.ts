'use strict';

class FooterController {

    constructor() {

    }

    $onInit() {
        console.log('init Footer');
    }

}

angular.module('euroProno2016WebApp')
    .controller('FooterController', FooterController);
