'use strict';

describe('Component: NewsComponent', function () {

  // load the controller's module
  beforeEach(module('euroProno2016WebApp'));

  var NewsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NewsComponent = $componentController('NewsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
