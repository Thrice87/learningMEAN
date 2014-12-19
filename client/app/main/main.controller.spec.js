'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('learningMeanApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      $rootScope,
      $httpBackend,
      id;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');

    MainCtrl = function() {
      return $controller('MainCtrl', { $scope : $rootScope });
    };

    var controller = MainCtrl();

    $httpBackend.whenGET('/api/todos').respond([ { _id: '1', text: 'test', dateCreated: new Date() } ]);

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
  });

  it('should update a todo successfully', function() {
    var todo = { _id: '1', text: 'Test 2' };

    $httpBackend.expectPUT('/api/todos/1', {
      text: 'Test 2',
      dateLastUpdated: new Date()
    }).respond(200);

    $rootScope.updateTodo(todo);
    $httpBackend.flush();
  });

  it('should delete a todo successfully', function() {
    var todo = { _id: '1'};

    $httpBackend.expectDELETE('/api/todos/1').respond(204);

    $rootScope.removeTodo(todo);
    $httpBackend.flush();
  });

});
