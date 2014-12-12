'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('learningMeanApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      $rootScope,
      $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');

    MainCtrl = function() {
      return $controller('MainCtrl', { $scope : $rootScope });
    };

    var controller = MainCtrl();

    $httpBackend.expectGET('/api/todos').respond([ { text: 'test', dateCreated: new Date() } ]);

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should add a todo successfully', function() {
    $httpBackend.expectPOST('/api/todos', {
      text: 'Test 1',
      dateCreated: new Date()
    }).respond(201, '');

    var todo = 'Test 1';

    $rootScope.addTodo(todo);
    $httpBackend.flush();
    expect($rootScope.status).toBe('Success');
  });

});
