(function() {
	'use strict';

	angular.module('measurePlatformApp').controller('MeasureUploadController',
			MeasureUploadController);

	MeasureUploadController.$inject = [ '$http','$scope', '$uibModalInstance',
			'Measure' ];

	function MeasureUploadController($http,$scope, $uibModalInstance, Measure) {
		var vm = this;
		vm.isUpload = false;
		vm.uploadFile = uploadFile;
		vm.uploadStatus;

		function uploadFile() {
			vm.isUpload = true;
			Measure.upload2($scope.fileread, onUploadSuccess, onUploadError).$promise;
		}
		
		vm.uploadFile2 = uploadFile2;
		function uploadFile2() {
			var uploadUrl = 'http://localhost/api/measure/upload2';
			uploadFileToUrl($scope.myFile, uploadUrl);
		}

		function onUploadSuccess(result) {
			vm.isUpload = false;
			$uibModalInstance.close(true);
		}

		function onUploadError() {
			vm.isUpload = false;
			$uibModalInstance.close(true);
		}

		vm.clear = clear;
		function clear() {
			$uibModalInstance.dismiss('cancel');
		}
		
		

		function uploadFileToUrl(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){
	        	vm.isUpload = false;
				$uibModalInstance.close(true);
	        })
	        .error(function(){
	        	vm.isUpload = false;
				$uibModalInstance.close(true);
	        });
		}
	}
})();
