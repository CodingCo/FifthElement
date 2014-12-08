describe('Factories in project FifthElement', function () {

    describe('docFactory', function () {

        var $scope, $httpBackend;


        beforeEach(function () {
            module('CMSApp.factories');
        });

        beforeEach(inject(function (_$httpBackend_, $rootScope) {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET("/api/getAllDocuments").respond({}); // Make a mock-controller that uses the factoruy


        }));

        // It's tests
        it("should be defined", inject(function (docFactory) {
            expect(docFactory).toBeDefined();
        }));

    });
});
