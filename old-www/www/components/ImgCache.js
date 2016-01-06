// https://github.com/chrisben/imgcache.js - website fo this component

/*--
  Example of cached img :

  <cached-image image="https://www.google.ca/images/srpr/logo11w.png" transclude="true">
     <h1>Title</h1>
     <p>Description</p>
  </cached-image>

  ** Use the transclude attribute if you want to put content inside the element.
--*/

directives.directive('cachedImage', function() {
    return {
        restrict: 'E',
        scope: {
            class: '@',
            image: '@',
            transclude: '@',
        },
        link: function($scope, $element, $attr) {
            var inside = angular.element($element.children()[0]);

            $scope.$watch('image', function(newValue, oldValue) {
                if (newValue) {
                    if (ImgCache.ready) {
                        // Check if image is cached
                        ImgCache.isCached($scope.image, function(path, success) {
                            if (success) {
                                // Remove spinner
                                removeLoadingIndicator();

                                inside.css('background-image', 'url("' + $scope.image + '")');

                                ImgCache.useCachedBackground(inside);
                            } else {
                                download();
                            }
                        });
                    } else {
                        download();
                    }
                }
            });

            function download() {
                // Add loading indicator
                if (!$scope.transclude)
                    inside.html('<i class="icon icon-md ion-ios7-reloading"></i>');

                if (ImgCache.ready) {
                    inside.css('background-image', 'url("' + $scope.image + '")');
                    ImgCache.cacheBackground(inside, function() {
                        // Use cached image
                        removeLoadingIndicator();
                        ImgCache.useCachedBackground(inside);
                    }, function() {
                        console.error('Could not download image (ImgCache).');
                        removeLoadingIndicator();
                    });
                } else {
                    var img = new Image();
                    img.src = $scope.image;

                    img.onload = function() {
                        removeLoadingIndicator();
                        inside.css('background-image', 'url("' + $scope.image + '")');
                    };

                    img.onerror = function() {
                        console.error('Could not download image.');
                        removeLoadingIndicator();
                    };
                }
            }

            function removeLoadingIndicator() {
                if (!$scope.transclude)
                    inside.html('');
            }
        },
        transclude: true,
        template: '<div class="" ng-transclude></div>',
    };
});
