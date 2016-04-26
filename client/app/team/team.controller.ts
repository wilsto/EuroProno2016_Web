'use strict';

(function() {

	class TeamController {
		constructor() {
			// Use the User $resource to fetch all users
			this.teams = [
				{ "id": 1, "code": "A3", "name": "Albanie", "group": "A" },
				{ "id": 2, "code": "C1", "name": "Allemagne", "group": "C" },
				{ "id": 3, "code": "B1", "name": "Angleterre", "group": "B" },
				{ "id": 4, "code": "F3", "name": "Autriche", "group": "F" },
				{ "id": 5, "code": "E1", "name": "Belgique", "group": "E" },
				{ "id": 6, "code": "D4", "name": "Croatie", "group": "D" },
				{ "id": 7, "code": "D1", "name": "Espagne", "group": "D" },
				{ "id": 8, "code": "A1", "name": "France", "group": "A" },
				{ "id": 9, "code": "F4", "name": "Hongrie", "group": "F" },
				{ "id": 10, "code": "C4", "name": "Irlande du Nord", "group": "C" },
				{ "id": 11, "code": "F2", "name": "Islande", "group": "F" },
				{ "id": 12, "code": "E2", "name": "Italie", "group": "E" },
				{ "id": 13, "code": "B3", "name": "Pays de Galle", "group": "B" },
				{ "id": 14, "code": "C3", "name": "Pologne", "group": "C" },
				{ "id": 15, "code": "F1", "name": "Portugal", "group": "F" },
				{ "id": 16, "code": "E3", "name": "République d'Irlande", "group": "E" },
				{ "id": 17, "code": "D2", "name": "Republique Tchèque", "group": "D" },
				{ "id": 18, "code": "A2", "name": "Roumanie", "group": "A" },
				{ "id": 19, "code": "B2", "name": "Russie", "group": "B" },
				{ "id": 20, "code": "B4", "name": "Slovaquie", "group": "B" },
				{ "id": 21, "code": "E4", "name": "Suède", "group": "E" },
				{ "id": 22, "code": "A4", "name": "Suisse", "group": "A" },
				{ "id": 23, "code": "D3", "name": "Turquie", "group": "D" },
				{ "id": 24, "code": "C2", "name": "Ukraine", "group": "C" }
			];
		}


	}

angular.module('euroProno2016WebApp.teams')
  .controller('TeamController', TeamController);

})();
