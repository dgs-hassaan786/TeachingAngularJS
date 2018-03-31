
// [] this is the dependency injection that means this module is dependent on any other

angular.module('app1', ['app2']);//'app2'

var app = angular.module('app2', []);




app.factory('MethodProviderFactory', function ($http) {

    var requestType = {};

    requestType.get = function (url, data) {
        var obj = {
            url: url,
            async: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (typeof data != 'undefined' || data != null) {
            obj.params = data;
        }
        return $http(obj);
    };

    requestType.post = function (url, data) {
        var obj = {
            url: url,
            async: true,
            method: 'POST',
            headers: {
                "content-type": "application/json; charset=utf-8",
            }
        };
        if (typeof data != 'undefined' || typeof data != null) {
            obj.data = data;
        }
        return $http(obj);
    };

    return requestType;

});

app.service('MyService', function (MethodProviderFactory) {

    var self = this;

    self.Login = function (username, password) {

        return MethodProviderFactory.post('http://localhost:32313/api/v1/account/login', JSON.stringify({ Username: username, Password: password }));

    };

    self.LoadUsers = function (count) {
        return MethodProviderFactory.get('http://localhost:32313/api/v1/data/users/' + count);
    }

    return self;

});

app.controller('MyFirstCtrl', function ($scope, MyService) {
    $scope.view = {
        email: '',
        password: ''
    };

    $scope.isFormSubmitted = false;
    $scope.result = '';//You have been logged in successfully
    $scope.users = [];

    $scope.submit = function () {


        try {
            //$scope.result =  MyService.Login($scope.view.email, $scope.view.password);
            //$scope.result = MyFactory.Login($scope.view.email, $scope.view.password);

            MyService.Login($scope.view.email, $scope.view.password)
                .then(
                //success callback
                function (response) {
                    debugger
                    var data = response.data;
                    $scope.isFormSubmitted = true;
                    $scope.result = data;
                },
                //error callback
                function (response) {
                    debugger
                    switch (response.status) {
                        case 0:
                            $scope.result = 'Service not accessible.';
                            break;
                        case 400:
                            $scope.result = response.data.Message;
                            break;
                        case 401:
                            $scope.result = 'Unauthorized';
                            break;
                        case 403:
                            $scope.result = 'Resource not available';
                            break;
                        case 404:
                            $scope.result = 'The Resource you are trying to access not found.';
                            break;
                        case 500:
                            $scope.result = 'Internal Server Error';
                            break;
                        default:
                            $scope.result = 'There is an unknown error';
                            break;
                    }

                    $scope.isFormSubmitted = true;
                    

                });


        } catch (e) {
            $scope.result = e;
        }

    }


    $scope.clear = function () {
        $scope.isFormSubmitted = false;
        $scope.view = {
            email: '',
            password: ''
        };

        $scope.result = '';

    }


    $scope.LoadAllUser = function () {
        MyService.LoadUsers(10)
            .then(
            //success callback
            function (response) {                
                $scope.users = response.data;              
            },
            //error callback
            function (response) {
                console.log(response);
                $scope.users = [];
            });


    };


    //Callback example
    function HelloGreeting(param) {
        console.log('Helloo');

        if (typeof param == 'function') {
            param();
        }
    }

    function HiGreeting() {
        console.log('Hi');
    }

    HelloGreeting(HiGreeting);


    //$scope.$watch('name',
    //    // This is the change listener, called when the value returned from the above function changes
    //    function (newValue, oldValue) {

    //        console.log('old value = ' + oldValue + '   new value = ' + newValue);
    //        console.log('scope.name = ' + $scope.name);
    //    }
    //);
});




