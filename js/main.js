var app = angular.module('app', ['ngMaterial', 'ngMockE2E']);

app.run(function ($httpBackend) {
	var iconPath = 'img/icon.jpg';
	var list = [
		{
			icon : iconPath,
			sms: "Hello"
		},
		{
			icon : iconPath,
			sms: "How are you?"
		},
		{
			icon : iconPath,
			sms: "What are you doing?"
		},
	];

	$httpBackend.whenGET('http://localhost:3000/list').respond(200, list);
	$httpBackend.whenPOST('http://localhost:3000/list').respond(function (method, url, data) {
		var result = JSON.parse(data);
		list.push(result);
		return [200, result];
	});
});

app.controller('chatCtrl', function ($scope, $http) {
	
	$scope.list = [];

	$http.get('http://localhost:3000/list')
		.success(function (result) {
			console.log('success', result);
			$scope.list = result;
		})
		.error(function (err) {
			console.log('error');
		});

	$scope.send = function (message) {
		var iconPath = 'img/icon.jpg';
		var item = {
			icon: iconPath,
			sms: message,
		};

		$http.post('http://localhost:3000/list', item)
			.success(function (result) {
				item.state = 'loading';
				$scope.list.push(item);
				$scope.message = null;
				$scope.load(item);
			})
			.error(function (err) {
				console.log('Error');
			});
	};

	$scope.load = function (item) {
		setTimeout(function () {
			item.state = '';
			$scope.$apply();
		}, 2000)
	}

});

