angular
	.module('app', [])
	.controller('mainCtrl', mainCtrl)
	.directive('avatar', avatarDirective);

function mainCtrl($scope, $http) {
	$scope.users = [];

	$scope.addNew = function(user) {
		if (user.url) {
			$scope.users.push({
				name: user.name,
				avatarUrl: user.url,
				email: user.email
			});

			user.name = '';
			user.url = '';
			user.email = '';
		} else {
			$http
				.get('https://api.thecatapi.com/v1/images/search?mime_types=gif')
				.then(function(response) {
					$scope.users.push({
						name: user.name,
						avatarUrl: response.data[0].url,
						email: user.email
					});
					user.name = '';
					user.url = '';
					user.email = '';
				});
		}
	};
}

function avatarDirective() {
	return {
		scope: {
			user: '='
		},
		restrict: 'E',
		replace: 'true',
		template:
			'<div class="Avatar">' +
			'<img ng-src="{{user.avatarUrl}}" />' +
			'<h4>{{user.name || "anonymous"}}</h4>' +
			'<h5>{{user.email || "unknown"}}</h5>' +
			'</div>',
		link: link
	};

	function link(scope) {
		if (!scope.user.avatarUrl) {
			scope.user.avatarUrl =
				'https://www.drupal.org/files/issues/default-avatar.png';
		}
	}
}
