'use strict';

describe('Component: Euro2016Component', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var Euro2016Component, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    Euro2016Component = $componentController('Euro2016Component', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
