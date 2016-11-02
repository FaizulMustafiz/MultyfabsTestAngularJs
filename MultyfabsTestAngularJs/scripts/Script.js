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
            var machineNo = $scope.machine.MachineNumber;
            var empCode = $scope.operator.EmployeeCode;
            var params = $.param({ 'machineNumber': machineNo, 'employeeCode': empCode }); 
            console.log(params);
            $http({
                method: 'POST',
                url: 'MultifabsWebService.asmx/IsMachineAssigned',
                data: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
            }).then(function (response) { 
                console.log(response);
                if (response.MachineAssigned) {
                    alert("This Machine already assigned");
                } else {
                    alert("This Machine is available");
                }
            },
            function (response) { 
                console.log(response);
            });
            var machineOperator = {
                MachineNumber: $scope.machine.MachineNumber,
                EmployeeCode: $scope.operator.EmployeeCode,
                EmployeeName: $scope.operator.EmployeeName,
                Schedule: $scope.select,
                EffectDate: $scope.effectFrom
            };
            //$http({
            //    method: 'post',
            //    url: "MultifabsWebService.asmx/SaveMachineOperator",
            //    contentType: "application/json; charset=utf-8",
            //    data: '{machineOperator : ' + JSON.stringify(machineOperator) + '}'
            //}).then(function () {
            //    alert("New Operator Assigned");
            //})
            //window.location.reload();
        }
        $scope.remove = function () {
            window.location.reload();
        }
    })

app.filter("jsDate", function () {
    return function (x) {
        return new Date(parseInt(x.substr(6)));
    };
});