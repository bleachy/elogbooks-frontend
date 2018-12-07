(function () {
    'use strict';

    angular
        .module('elogbooks.job')
        .controller('JobViewController', ['jobResponse', '$http', '$state', JobViewController]);

    function JobViewController(jobResponse, $http, $state) {
        var vm = this;
        vm.job = jobResponse;
        vm.statuses = {
            0: {id: "0", name: "Open"},
            1: {id: "1", name: "Closed"}
        };
        vm.selectedStatus = vm.job.status == 0 ? vm.statuses[0] : vm.statuses[1];
        vm.update = update;

        // Load Assignee list
        vm.possibleAssignees = null;
        loadPossibleAssignees()

        function update() {
            console.log(vm.job);

            $http.put(
                'http://localhost:8001/job/' + vm.job.id,
                {
                    description: vm.job.description,
                    status: vm.selectedStatus.id,
                    assignee: vm.job.assignee ? vm.job.assignee.id : null
                }
            ).then(function (response) {
                $state.go('jobs.list', {});
            }, function () {
                console.log('Request Failed');
            });
        }

        function loadPossibleAssignees() {
            $http.get(
                'http://localhost:8001/user', {}
            ).then(function (response) {
                vm.possibleAssignees = response.data.data;
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();
