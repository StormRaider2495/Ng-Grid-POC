var app = angular.module("myApp", ["ngGrid"]);
app.controller("MyCtrl", function($scope, $http) {

    $scope.studentDataPath = 'scripts/studentData.json';
    $scope.teacherDataPath = 'scripts/teacherData.json';
    $scope.dataPath = $scope.studentDataPath;
    $scope.loadStudentData = function() {
        $scope.dataPath = $scope.studentDataPath;
        $scope.getPagingData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        $scope.columnDefs = $scope.column1;
    };
    $scope.loadTeacherData = function() {
        $scope.dataPath = $scope.teacherDataPath;
        $scope.getPagingData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        $scope.columnDefs = $scope.column2;
    };
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.column1 = [{
        field: 'name',
        displayName: 'Student Name',
        enableCellEdit: true
    }, {
        field: 'age',
        displayName: 'Age',
        cellTemplate: '<div ng-class="{selected: row.getProperty(col.field) > 50}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>',
        enableCellEdit: true
    }, {
        field: 'location',
        displayName: 'Location',
        enableCellEdit: true
    }, {
        field: 'allowance',
        displayName: 'Allowance',
        enableCellEdit: true
    }, {
        field: 'pass',
        displayName: 'Pass',
        enableCellEdit: true
    }];
    $scope.column2 = [{
        field: 'name',
        displayName: 'Teacher Name',
        enableCellEdit: true
    }, {
        field: 'age',
        displayName: 'Age',
        cellTemplate: '<div ng-class="{selected: row.getProperty(col.field) > 50}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>',
        enableCellEdit: true
    }, {
        field: 'location',
        displayName: 'Location',
        enableCellEdit: true
    }, {
        field: 'allowance',
        displayName: 'Allowance',
        enableCellEdit: true
    }, {
        field: 'tcc',
        displayName: 'TCC',
        enableCellEdit: true
    }];
    $scope.totalServerItems = 0;
    $scope.columnDefs = $scope.column1;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 15, 20],
        pageSize: 5,
        currentPage: 1,
        totalServerItems: $scope.totalServerItems
    };
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagingData = function(pageSize, page) {

        $http.get($scope.dataPath).success(function(data) {
            $scope.setPagingData(data, page, pageSize);
        });
    };

    $scope.getPagingData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagingData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagingData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.gridOptions = {
        data: "myData",
        showGroupPanel: true,
        // multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePinning: true,
        enableColumnResize: true,
        enablePaging: true,
        pagingOptions: $scope.pagingOptions,
        columnDefs: 'columnDefs',
        filterOptions: $scope.filterOptions,
        // showFilter: true,
        showFooter: true
    };
});
