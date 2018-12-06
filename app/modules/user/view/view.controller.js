(function () {
    'use strict';

    angular
        .module('elogbooks.user')
        .controller('UserViewController', ['userResponse', '$http', '$state', UserViewController]);

    function UserViewController(userResponse, $http, $state) {
        var vm = this;
        vm.user = userResponse;
        vm.update = update;

        function update() {
            $http.put(
                'http://localhost:8001/user/' + vm.user.id,
                {
                    name: vm.user.name,
                    email: vm.user.email
                }
            ).then(function (response) {
                $state.go('users.list', {});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();
