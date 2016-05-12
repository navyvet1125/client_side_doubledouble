angular.module('DoubleDoubleApp')
	.controller('TodosController',TodosController);


TodosController.$inject=['$http'];

function TodosController($http){
	var self = this;
	self.all = [];
	self.getTodo = getTodo;
	self.addTodo = addTodo;
	self.completeTodo = completeTodo;
	self.deleteTodo = deleteTodo;
	self.updateTodo = updateTodo;
	self.test = function(todo){console.log('I lost my focus!',todo);};
	self.newTodo = {};


	function getTodo(){
		$http
	      .get('http://localhost:3000/api/todos')
	      .then(function(response){
	        console.log(response);
	        self.all = response.data;
	      });
	}
	getTodo();
	function addTodo(){
		$http
	      .post('http://localhost:3000/api/todos', self.newTodo)
	      .then(function(response){
	        console.log(response);
	        self.newTodo = {};
	        getTodo();
	      });

	}
	function completeTodo(todo){
		todo.isComplete=true;
		$http
	      .patch('http://localhost:3000/api/todos/'+todo._id,todo)
	      .then(function(response){
	      	console.log(response);
	        getTodo();
	      });
	}
	function updateTodo(todo){
		console.log(todo);
		$http
	      .patch('http://localhost:3000/api/todos/'+todo._id,todo)
	      .then(function(response){
	      	console.log(response);
	        getTodo();
	      });
	}

	function deleteTodo(todo){
		$http
	      .delete('http://localhost:3000/api/todos/'+todo._id)
	      .then(function(response){
	        getTodo();
	      });
	}

}