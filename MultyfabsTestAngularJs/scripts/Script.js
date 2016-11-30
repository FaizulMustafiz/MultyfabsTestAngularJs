/// <reference path="angular.js" />
/// <reference path="angular-route.js" />
/// <reference path="angular-ui-router.js" />
/// <reference path="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.js" />

var app = angular
    .module("Demo", ['angularjs-datetime-picker'])
    .controller("machineController", function ($scope, $http) {
        var successCallBack = function (response) {
            $scope.machines = response.data;
        }
        var errorCallBack = function (reason) {
            $scope.error = reason.data;
        }
        $scope.edit = function (machine) {
            $scope.machine = machine;
        };
        $http({
            method: 'get',
            url: 'MultifabsWebService.asmx/GetAllMachines'
        }).then(successCallBack, errorCallBack);
    })
    .controller("operatorController", function ($scope, $http) {
        var successCallBack = function (response) {
            $scope.operators = response.data;
        }
        var errorCallBack = function (reason) {
            $scope.error = reason.data;
        }
        $scope.load = function (operator) {
            $scope.operator = operator;
        };
        $http({
            method: 'get',
            url: 'MultifabsWebService.asmx/GetAllEmployee'
        }).then(successCallBack, errorCallBack);
    })
    .controller("machineOperatorController", function ($scope, $http) {
        var successCallBack = function (response) {
            $scope.machineOperators = response.data;
        }
        var errorCallBack = function (reason) {
            $scope.error = reason.data;
        }
        $http({
            method: 'get',
            url: 'MultifabsWebService.asmx/GetAllMachineOperators'
        }).then(successCallBack, errorCallBack);
    })
    .controller("scheduleController", function ($scope, $http) {
        var successCallBack = function (response) {
            $scope.schedules = response.data;
        }
        $http({
            method: 'get',
            url: "MultifabsWebService.asmx/GetAllSchedule"
        }).then(successCallBack);
    })
    .controller("OpeatorAssignController", function ($scope, $http) {
        $scope.add = function () {
            $scope.change = function (select) {
                $scope.select = select;
            };
            var machineOperator = {
                MachineNumber: $scope.machine.MachineNumber,
                EmployeeCode: $scope.operator.EmployeeCode,
                EmployeeName: $scope.operator.EmployeeName,
                Schedule: $scope.select,
                EffectDate: $scope.effectFrom
            };
            var machineNo = $scope.machine.MachineNumber;
            var empCode = $scope.operator.EmployeeCode;
            var empName = $scope.operator.EmployeeName;
            var schedule = $scope.select;
            var params = $.param({ 'machineNumber': machineNo, 'employeeCode': empCode });
            var scheduleCheck = $.param({ 'machineNumber': machineNo, 'schedule': schedule });
            console.log(params);
            console.log(scheduleCheck);
            $http({
                method: 'POST',
                url: 'MultifabsWebService.asmx/IsScheduleAvailable',
                data: scheduleCheck,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                console.log(response);
                if (response.data.ScheduleAssigned) {
                    $scope.result = "Machine " + machineNo + " is alredy assigned for this " + schedule + " to " + empName;
                } else {
                    $http({
                        method: 'POST',
                        url: 'MultifabsWebService.asmx/IsMachineAssigned',
                        data: params,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function (response) {
                        console.log(response);
                        console.log(response.data.EmployeeCode);
                        console.log(response.data.MachineAssigned);
                        if (response.data.MachineAssigned === true) {
                            $scope.result = "Machine " + machineNo + " is already assigned to " + empName;
                        } else {
                            $http({
                                method: 'post',
                                url: "MultifabsWebService.asmx/SaveMachineOperator",
                                contentType: "application/json; charset=utf-8",
                                data: '{machineOperator : ' + JSON.stringify(machineOperator) + '}'
                            }).then(function () {
                                alert("New Operator Assigned");
                            });
                            window.location.reload();
                        }
                    },
                function (response) {
                    console.log(response);
                });
                }
            });
        }
        $scope.remove = function () {
            window.location.reload();
        }
    });

app.filter("jsDate", function () {
    return function (x) {
        return new Date(parseInt(x.substr(6)));
    };
});