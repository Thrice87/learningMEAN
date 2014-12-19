'use strict';

angular.module('learningMeanApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $http.get('/api/todos').success(function(todos) {
      $scope.todos = todos;
      socket.syncUpdates('todo', $scope.todos);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('todo');
    });

    $scope.addTodo = function(todo) {
      if($scope.todo === '') {
        return;
      }

      $scope.status = 'Saving';

      $http.post('/api/todos', {
        text: todo,
        dateCreated: new Date()
      });
      $scope.todo = '';
    };

    $scope.updateTodo = function(todo) {
      $http.put('/api/todos/' + todo._id, {
        text: todo.text,
        dateLastUpdated: new Date()
      });

      $scope.todo = '';
    };

    $scope.removeTodo = function(todo) {
      $http.delete('/api/todos/' + todo._id);
    };
  });
