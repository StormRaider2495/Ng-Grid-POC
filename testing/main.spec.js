describe('ng-grid controller MyCtrl', function() {
    var myCtrl,
        $scope,
        $httpBackend,
        demoData,
        mockNgGrid,
        elm,
        demoData = [{
                "name": "Aaron",
                "age": 21,
                "location": "California",
                "allowance": 505,
                "paid": true
            },
            {
                "name": "Tiancum",
                "age": 34,
                "location": "Bangalore",
                "allowance": 53,
                "paid": false
            },
            {
                "name": "Jacob",
                "age": 52,
                "location": "Vizag",
                "allowance": 27,
                "paid": false
            }
        ];
    beforeEach(module('ngGrid'));
    beforeEach(module('myApp'));
    beforeEach(inject(function($rootScope, $compile, $controller, _$httpBackend_) {
        $scope = $rootScope.$new();

        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', $scope.studentDataPath).respond(200, demoData);
        // $httpBackend.when('GET', $scope.teacherDataPath).respond(200, demoData);

        myCtrl = $controller('MyCtrl', {
            $scope: $scope
        });
        elm = angular.element('<div class="gridStyle" ng-grid="gridOptions"></div>');
        $compile(elm, $scope);
        $scope.$digest();

    }));

    it('should have myCtrl controller defined', function() {
        expect(myCtrl).toBeDefined();
    });

    it('should have gridOptions defined', function() {
        spyOn($scope, 'gridOptions');
        expect($scope.gridOptions).toBeDefined();
        expect($scope.gridOptions.pagingOptions).toBeObject;
        expect($scope.gridOptions.pagingOptions.currentPage).toBe(1);
    });
    it('should have pagingOptions defined', function() {
        spyOn($scope, 'pagingOptions');
        expect($scope.pagingOptions).toBeDefined();
        expect($scope.pagingOptions).toBeObject;
        expect($scope.pagingOptions.currentPage).toBe(1);
    });

    it('should have getPagingData function return data from json file', function() {
        $scope.getPagingData();
        $httpBackend.when('GET', 'scripts/data.json').respond(200, demoData);
        $httpBackend.flush();
    });

    it('should have setPagingData function set desired output', function() {
        expect($scope.pagingOptions.currentPage).toBe(1);
        expect($scope.pagingOptions.pageSize).toBe(5);
        $scope.setPagingData(demoData);
    });

    it('should call getPagingData on currentPage change', function() {
        $scope.pagingOptions.currentPage = 1;
        $scope.$digest();
        $scope.pagingOptions.currentPage = 2;
        $scope.$digest();
    });

    it('should call getPagingData on currentPage change', function() {
        $scope.filterOptions.filterText = "";
        $scope.$digest();
        $scope.filterOptions.filterText = "Name";
        $scope.$digest();
    });

});
