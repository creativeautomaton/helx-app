"use strict";
// Ionic Starter App

angular.module('helx.controllers', ['ngCookies'])

.controller('AppCtrl', function(

  $scope, $ionicSlideBoxDelegate, $cookieStore,
  $cookies, $filter, $http, $location, $timeout,
  $ionicGesture, $ionicModal, $ionicPopover,
  $state, $ImageCacheFactory, onlineStatus, $ionicViewSwitcher

  ) {

  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //  $scope.$on('$ionicView.enter', function(e) {
  //    console.log('I was loaded when this was view loaded.');
  //  });

$ionicViewSwitcher.nextTransition('none');

$scope.hiddenElement = function(){
  // return "ng-hide";
  if ($state.is('app.main')){
    return "ng-hide";
  } else {
    return "ng-show";
  }
}

$cookieStore.put('system_instructions', false);

$scope.slide={Up:false};
$scope.rotate={Flip:false};
$scope.show={Products:false};
$scope.show={Offline:false};
$scope.hide={Offline:false};

$scope.onTouch = function($OverViewEvent) {
  $scope.show={Products:true};
}

// An array setup for checking a toggle state
$scope.ultrasoundTapCount = [];

  // Drag up Product animation
    $scope.onTap = function (){
       if(!$scope.ultrasoundTapCount['1']){
         $scope.slide.Up=true;
         $scope.rotate={Flip:true};
         console.log('Hey you tapped me up. Great!');
         $scope.ultrasoundTapCount['1'] = 1;
       }else{
         $scope.slide.Up=false;
         $scope.rotate={Flip:false};
         console.log('Then you tapped me Down. Even better!');
         $scope.ultrasoundTapCount['1'] = 0;
       }
   }
    $scope.onSwipeUp = function(){
      $scope.slide.Up=true;
      $scope.rotate={Flip:true};
      console.log('You Swiped Up.');
    }
    $scope.onSwipeLeft = function(){
      $scope.slide.Up=true;
      $scope.rotate={Flip:true};
      console.log('You Swiped Left.');
    }
    $scope.onSwipeRight = function(){
      $scope.slide.Up=true;
      $scope.rotate={Flip:true};
      console.log('You Swiped Right.');
    }
    // Drag up Product animation
    $scope.onDragDown = function(){
      $scope.slide.Up=false;
      $scope.rotate={Flip:false};
      console.log('You Draged it Down!');
    }

    $scope.hoverItem = function(hovered){
        if (hovered) {
          element.addClass('circle-hover');
        }
        else{
          element.removeClass('circle-hover');
        }
     }

  // Sub Menu Controller
  $ionicPopover.fromTemplateUrl('sub-menu.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.subMenu = function($event) {
    $scope.popover.show($event);
  };
  $scope.closesubMenu = function($event) {
    $scope.popover.hide($event);
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function($event) {
    $scope.popover.remove($event);
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

 // Menu Links - Denoted By {{ }} //Example is {{main_menu}}
	  $scope.main_menu = '#/app/main';
	  $scope.helx_touch = '#/app/products/ultrasound';
    $scope.helx_test = '#/app/test';

    // Sales Quiz Page
    $scope.sales_quiz = '#/app/sales-quiz-intro';
    $scope.quiz_start = '#/app/quiz';
    $scope.quiz_correct = '#/app/correct';
    $scope.quiz_wrong = '#/app/wrong';
    $scope.quiz_question2 = '#/app/question-2';

    // Workflow Simulation Page
	  $scope.workflow = '#/app/workflow';

    // Resource library Page
    //$scope.resource_library = '#/app/library';
    $scope.library_clinical = '#/app/clinical-images';
    $scope.library_videos = '#/app/clinical-videos';
    $scope.library_literature = '#/app/clinical-literature';

	  // $scope.data_proof = '#/app/data';
    $scope.usability = '#/app/usability';

    // Siemens Ultasound Information
    $scope.siemens_information = '#/app/siemens-information';
    $scope.contact_information = '#/app/contact';

    // System Family Tree
    $scope.system_tree = '#/app/system';
    $scope.system_tree_main = '#/app/system-main';

    // Single Product Pages
    $scope.acuson_s3000 ='#/app/acuson/s3000';
    $scope.acuson_s2000 ='#/app/acuson/s2000';
    $scope.acuson_s1000 ='#/app/acuson/s1000';


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('modals/modal-helx-info.html', {
      scope: $scope,
      animation: 'popIn'
      }).then(function(modal) {
        $scope.modal = modal;
    });

    // Open the login modal
    $scope.HelxInfoModal = function($helxInfo) {
     $scope.modal.show($helxInfo);
    };
    // Triggered in the login modal to close it
    $scope.closeHelxInfoModal = function($helxInfo) {
     $scope.modal.hide($helxInfo);
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function($helxInfo) {
      $scope.modal.remove($helxInfo);
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


    $scope.isOnline = function () {
      var isConnected = false;
      var networkConnection = navigator.connection;
      if (!networkConnection.type) {
        console.log('networkConnection.type is not defined');
        $log.error('networkConnection.type is not defined');
        return false;
      }

      switch (networkConnection.type.toLowerCase()) {
        case 'ethernet':
        case 'wifi':
        case 'cell_2g':
        case 'cell_3g':
        case 'cell_4g':
        case '2g':
        case '3g':
        case '4g':
        case 'cell':
        case 'cellular':
          isConnected = true;
          break;
      }

      console.log('isOnline? '+ isConnected);
      $log.log('isOnline? '+ isConnected);
      return isConnected;
    };


})

.controller('DescriptionCtrl', function($scope, $ionicPopover) {
	// Description Popover Controller
  $ionicPopover.fromTemplateUrl('templates/description.html', {
    scope: $scope,
    animation: 'popIn'
	  }).then(function(popover) {
		$scope.popover = popover;
	  });

  $scope.Description = function($descriptionEvent) {
    $scope.popover.show($descriptionEvent);
  };
  $scope.closeDescription = function($descriptionEvent) {
    $scope.popover.hide($descriptionEvent);
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function($descriptionEvent) {
    $scope.popover.remove($descriptionEvent);
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})

.controller('AltCtrl', function($scope, $ionicPopover) {
	// Description Popover Controller
  $ionicPopover.fromTemplateUrl('templates/description.html', {
    scope: $scope,
    animation: 'popIn'
	  }).then(function(popover) {
		$scope.popover = popover;
	  });

  $scope.Description = function($descriptionEvent) {
    $scope.popover.show($descriptionEvent);
  };
  $scope.closeDescription = function($descriptionEvent) {
    $scope.popover.hide($descriptionEvent);
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function($descriptionEvent) {
    $scope.popover.remove($descriptionEvent);
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


})


.controller('ultrasoundToolCtrl', function($scope, $ionicPopover) {
	// Description Popover Controller
  $ionicPopover.fromTemplateUrl('templates/ultrasound-tool.html', {
    scope: $scope,
    animation: 'popIn'
	  }).then(function(popover) {
		$scope.popover = popover;
	  });

  $scope.ultrasoundTool = function($ultrasoundToolEvent) {
    $scope.popover.show($ultrasoundToolEvent);
    $scope.hide={LeftArrow:true};
  };
  $scope.closeultrasoundTool = function($ultrasoundToolEvent) {
    $scope.popover.hide($ultrasoundToolEvent);
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function($ultrasoundToolEvent) {
    $scope.popover.remove($ultrasoundToolEvent);
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function($ultrasoundToolEvent) {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function($ultrasoundToolEvent) {
    // Execute action
  });

  $scope.hide={LeftArrow:true};
  $scope.hide={RightArrow:false};

  //Go to Feature and load correct slide
    function accessorySlider(index) {
    //Go to Feature from icon click
    $scope.prevAccessorySlide = function() {
      $scope.activeSlide = index + 1 ;
        $scope.hide={LeftArrow:true};
    };
    $scope.nextAccessorySlide = function() {
      $scope.activeSlide = index - 1 ;
      $scope.hide={RightArrow:true};
    };
      $scope.activeSlide = index;
  }

  setTimeout(function() {
      accessorySlider($scope.activeSlide);
  }, 400);

  $scope.slideChanged = accessorySlider;

})

.controller('HelxOverviewCtrl', function($scope, $ionicModal, $state, $ionicSlideBoxDelegate, $timeout) {
  // Description HELX Overview Modal Controller
  $ionicModal.fromTemplateUrl('templates/helx-overview.html', {
    scope: $scope,
    animation: 'popIn'
	  }).then(function(modal) {
      $scope.modal = modal;
      if($state.is('app.products.ultrasound')){
          $timeout(function () {
            $scope.modal.show();
          }, 1100);
        }
  });
  $scope.close={Modal:false};

  $scope.OverView = function($OverViewEvent) {
    $scope.modal.show($OverViewEvent);
    $scope.hide={LeftArrow:true};
  }
  $scope.closeOverView = function($OverViewEvent) {
    $scope.modal.hide($OverViewEvent);
    $scope.close={Modal:true};
    $scope.show={Products:true};
    $scope.show={Description:true};
  }
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function($OverViewEvent) {
    $scope.modal.remove($OverViewEvent);
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    $scope.close={Modal:true};
    $scope.show={Products:true};
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.lockSlide = function () {
     $ionicSlideBoxDelegate.enableSlide( false );
  }

    //Go to Feature and load correct slide
      function Slides(index) {
      //Go to Feature from icon click
      $scope.feature0 = function() {
        $scope.activeSlide = index = 0 ;
      };
      $scope.feature1 = function() {
        $scope.activeSlide = index = 1 ;
      };
      $scope.feature2 = function() {
        $scope.activeSlide = index = 2 ;
      };
      $scope.feature3 = function() {
        $scope.activeSlide = index = 3 ;
      };
      $scope.feature4 = function() {
        $scope.activeSlide = index = 4 ;
      };
      $scope.feature5 = function() {
        $scope.activeSlide = index = 5 ;
      };
      $scope.feature6 = function() {
        $scope.activeSlide = index = 6 ;
      };
        $scope.activeSlide = index;
      console.log("This slide is " + index);
    }

    setTimeout(function() {
        Slides($scope.activeSlide);
    }, 400);

    $scope.slideChanged = Slides;
})

.controller('FeaturesCtrl', function($scope, $ionicPopover) { })

.controller('ClinicalImagesCtrl', function($scope, $http, $location, $timeout, $ionicModal ) {

  $http.get('data/library.json').then(function (res) {
      $scope.Clinical = res.data.Clinical;
      $scope.filteredSlides = $scope.Clinical.slice(begin, end);
  });

  // Description Popover Controller
  $ionicModal.fromTemplateUrl('templates/modals/modal-clinical-images.html', {
    scope: $scope,
    animation: 'popIn'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });

  $scope.clinicalImageModal = function($clinicalImageModalEvent) {
    $scope.modal.show($clinicalImageModalEvent);
  };
  $scope.closeClinicalImageModal = function($clinicalImageModalEvent) {
    $scope.modal.hide($clinicalImageModalEvent);
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function($clinicalImageModalEvent) {
    $scope.modal.remove($clinicalImageModalEvent);
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  //Go page slider next and prev functions
    function clinicalSlider(index) {

        $scope.prevSlide = function() {
          $scope.activeSlide = index - 1 ;
        };
        $scope.nextSlide = function() {
          $scope.activeSlide = index + 1 ;
        };
    }
    $scope.activeSlide = 0;

    setTimeout(function() {
      clinicalSlider($scope.activeSlide);
    }, 0);

})

.controller('clinicalModalSlider', function($scope) {
  // Modal slider next and prev functions
    function clinicalModalSlider(index) {

        $scope.prevSlideModal = function() {
          $scope.activeSlide = index - 1 ;
        };
        $scope.nextSlideModal = function() {
          $scope.activeSlide = index + 1 ;
        };
    }
    $scope.activeSlide = 0;

    setTimeout(function() {
      clinicalModalSlider($scope.activeSlide);
    }, 0);

    $scope.slideChanged = clinicalModalSlider;
})

.controller('systemCtrl', function(
    $scope,  $ionicSlideBoxDelegate, $cookieStore,
    $ionicViewSwitcher, $cookies, $filter, $http,
    $location, $timeout, $ionicModal, $state, $interval
  ) {

    // Description HELX Overview Modal Controller
    $ionicModal.fromTemplateUrl('templates/modals/system-tree.html', {
      scope: $scope,
      animation: 'popIn'
      }).then(function(modal) {
        $scope.modal = modal;
            setTimeout(function(){
              $http({
                method: 'GET',
                url: '/#/app/system'
                   }).then(function successCallback(response) {
                     $scope.hide={Offline:false};
                     $scope.show={Offline:false};
                     if($state.is('app.system' )){
                          $scope.modal.show();
                          $scope.hide={Background:true};
                       }
                    }, function errorCallback(response) {
                      $scope.hide={Offline:true};
                      $scope.show={Offline:true};
                      $scope.hide={Background:true};
                      console.log('Online: false');
              });
              console.log("Interval")
            }, 100, true);
    });
    $scope.close={Modal:false};

    $scope.usabilityModal = function($usabilityModalEvent) {
      $scope.modal.show($usabilityModalEvent);
    }
    $scope.closeusabilityModal = function($usabilityModalEvent) {
      $scope.modal.hide($usabilityModalEvent);
      $scope.close={Modal:true};
      $scope.hide={Background:false};
    }
    $scope.$on('modal.hidden', function() {
      $scope.close={Modal:true};
      $scope.hide={Background:false};
    });

    $scope.system_instructions_cookie = $cookieStore.get('system_instructions');

    // Description HELX Overview Modal Controller
    $ionicModal.fromTemplateUrl('templates/modals/system-tree-instructions.html', {
      scope: $scope,
      animation: 'popIn'
      }).then(function(modal) {
            $scope.instruction_modal = modal;
    });

    $scope.instructionsModal = function($instructionsModalEvent) {
        $scope.instruction_modal.show($instructionsModalEvent);
    }
    $scope.closeinstructionsModal = function($instructionsModalEvent) {
      $scope.instruction_modal.hide($instructionsModalEvent);
      $scope.close={Modal:true};
      $scope.hide={Background:false};
      $cookieStore.put('system_instructions', true);
    }
    $scope.$on('modal.hidden', function() {
      $scope.close={Modal:true};
      $scope.hide={Background:false};
    });

  // Grid Items
      // Row 1
      $scope.enabled1={Classic_systems:false};
      $scope.enabled2={Helx_evolution:false};
      $scope.enabled3={Linear_release:false};
      $scope.enabled4={Helx_touch_control:false};
      $scope.enabled5={Abvs:false};
      $scope.enabled6={Mmr:false};
      // Row 2
      $scope.enabled7={Vt_imaging:false};
      $scope.enabled8={Vt_quantification:false};
      $scope.enabled9={Vt_iq:false};
      $scope.enabled10={Esie_fusion:false};
      $scope.enabled11={Esie_guide:false};
      $scope.enabled12={Mr_package:false};
      // Row 3
      $scope.enabled13={Sie_stream:false};
      $scope.enabled14={Sie_stream_hd:false};
      $scope.enabled15={Cadence_contrast:false};
      $scope.enabled16={Esie_image_6c1d_mc94:false};
      $scope.enabled17={Esie_image_8c3_hd:false};
      $scope.enabled18={Image_6c1_18l6_4v1c:false};
      // Row 4
      $scope.enabled19={Helx_8c3_hd:false};
      $scope.enabled20={Helx_7cf1:false};
      $scope.enabled21={Helx_mc94:false};
      $scope.enabled22={Optimized_18l6_hd:false};
      $scope.enabled23={Helx_8l6_hd:false};
      $scope.enabled24={Color_doppler_9l4:false};
      // Row 5
      $scope.enabled25={Helx_12l4_transducer:false};
      $scope.enabled26={Hud:false};
      $scope.enabled27={Sw_vc31a:false};
      $scope.enabled28={Hw_sw_vc30a_vc31a:false};
      $scope.enabled29={Sw_hw_vd10a:false};
      $scope.enabled30={Sw_vd10a:false};
      // Row 6
      $scope.enabled31={Led_monitor:false};
      $scope.enabled32={Wireless_dicom:false};
      $scope.enabled33={Cti_standard:false};
      $scope.enabled34={Windows_7:false};
      $scope.enabled35={New_control_panel:false};
      $scope.enabled36={Touch_display:false};
      // Row 7
      $scope.enabled36={Powerscribe_360:false};
      // Release Menu Items
      $scope.menu_enabled1={vc31:false};
      $scope.menu_enabled2={vc20a:false};
      $scope.menu_enabled3={vc25a:false};
      $scope.menu_enabled4={vc30a:false};
      $scope.menu_enabled5={vc31a:false};
      $scope.menu_enabled6={vd10a:false};
      // System Menu Items
        $scope.enabled1000={S1000:false};
        $scope.enabled2000={S2000:false};
        $scope.enabled3000={S3000:false};
      $scope.active={menu:false};

  $scope.clear_enabled = function(){
      $scope.enabled1={Classic_systems:false};
      $scope.enabled2={Helx_evolution:false};
      $scope.enabled3={Linear_release:false};
      $scope.enabled4={Helx_touch_control:false};
      $scope.enabled5={Abvs:false};
      $scope.enabled6={Mmr:false};
      $scope.enabled7={Vt_imaging:false};
      $scope.enabled8={Vt_quantification:false};
      $scope.enabled9={Vt_iq:false};
      $scope.enabled10={Esie_fusion:false};
      $scope.enabled11={Esie_guide:false};
      $scope.enabled12={Mr_package:false};
      $scope.enabled13={Sie_stream:false};
      $scope.enabled14={Sie_stream_hd:false};
      $scope.enabled15={Cadence_contrast:false};
      $scope.enabled16={Esie_image_6c1d_mc94:false};
      $scope.enabled17={Esie_image_8c3_hd:false};
      $scope.enabled18={Image_6c1_18l6_4v1c:false};
      $scope.enabled19={Helx_8c3_hd:false};
      $scope.enabled20={Helx_7cf1:false};
      $scope.enabled21={Helx_mc94:false};
      $scope.enabled22={Optimized_18l6_hd:false};
      $scope.enabled23={Helx_8l6_hd:false};
      $scope.enabled24={Color_doppler_9l4:false};
      $scope.enabled25={Helx_12l4_transducer:false};
      $scope.enabled26={Hud:false};
      $scope.enabled27={Sw_vc31a:false};
      $scope.enabled28={Hw_sw_vc30a_vc31a:false};
      $scope.enabled29={Sw_hw_vd10a:false};
      $scope.enabled30={Sw_vd10a:false};
      $scope.enabled31={Led_monitor:false};
      $scope.enabled32={Wireless_dicom:false};
      $scope.enabled33={Cti_standard:false};
      $scope.enabled34={Windows_7:false};
      $scope.enabled35={New_control_panel:false};
      $scope.enabled36={Touch_display:false};
      $scope.enabled37={Powerscribe_360:false};
      $scope.menu_enabled1={vc31:false};
      $scope.menu_enabled2={vc20a:false};
      $scope.menu_enabled3={vc25a:false};
      $scope.menu_enabled4={vc30a:false};
      $scope.menu_enabled5={vc31a:false};
      $scope.menu_enabled6={vd10a:false};

      $scope.enabled1000={S1000:false};
      $scope.enabled2000={S2000:false};
      $scope.enabled3000={S3000:false};

      $scope.disabledS1000={S1000:false};
      $scope.disabledS2000={S2000:false};
      $scope.disabledS3000={S3000:false};

      $scope.active={menu:false};
  }
  //system select menu items
  $scope.vc31 = function(){
      $scope.enabled5={Abvs:true};
      $scope.active={vc31:true};
      $scope.enabled7={Vt_imaging:true};
      $scope.enabled8={Vt_quantification:true};

      $scope.enabled2000={S2000:true};

      $scope.disabledS1000={S1000:true};
      $scope.disabledS3000={S3000:true};
  }
  $scope.vc20a = function() {
      $scope.enabled9={Vt_iq:true};
      $scope.enabled6={Mmr:true};
      $scope.menu_enabled2={vc20a:true};
      $scope.enabled3000={S3000:true};

      $scope.disabledS1000={S1000:true};
      $scope.disabledS2000={S2000:true};
  }
  $scope.vc25a = function() {
      $scope.menu_enabled3={vc25a:true};
      $scope.active={vc25a:true};
      $scope.enabled1={Classic_systems:true};
      $scope.enabled5={Abvs:true};
      $scope.enabled6={Mmr:true};
      $scope.enabled7={Vt_imaging:true};
      $scope.enabled8={Vt_quantification:true};
      $scope.enabled9={Vt_iq:true};
      $scope.enabled10={Esie_fusion:true};
      $scope.enabled11={Esie_guide:true};
      $scope.enabled12={Mr_package:true};
      $scope.enabled13={Sie_stream:true};
      $scope.enabled18={Helx_8c3_hd:true};
      $scope.enabled19={Helx_8c3_hd:true};
      $scope.enabled28={Hw_sw_vc30a_vc31a:true};
      $scope.enabled37={Powerscribe_360:true};

      $scope.S1000 = function(){
        $scope.enabled1000={S1000:true};
        $scope.enabled12={Mr_package:true};
        $scope.active={vc25a:true};
      }
      $scope.S2000 = function(){
          $scope.enabled2000={S2000:true};
          $scope.enabled7={Vt_imaging:true};
          $scope.enabled8={Vt_quantification:true};
          $scope.enabled5={Abvs:true};
          $scope.active={vc25a:true};
      }
      $scope.S3000 = function(){
        $scope.enabled3000={S3000:true};
        $scope.enabled10={Esie_fusion:true};
        $scope.enabled11={Esie_guide:true};
        $scope.enabled19={Helx_8c3_hd:true};
        $scope.enabled37={Powerscribe_360:true};
        $scope.active={vc25a:true};
      }
  }
  $scope.vc30a = function() {
      $scope.active={vc30a:true};
      $scope.menu_enabled3={vc30a:true};
      $scope.enabled3={Linear_release:true};
      $scope.enabled9={Vt_iq:true};
      $scope.enabled10={Esie_fusion:true};
      $scope.enabled11={Esie_guide:true};
      $scope.enabled13={Sie_stream_hd:true};
      $scope.enabled18={Helx_8c3_hd:true};
      $scope.enabled37={Powerscribe_360:true};
      $scope.enabled15={Cadence_contrast:true};
      $scope.enabled16={Esie_image_6c1d_mc94:true};
      $scope.enabled17={Esie_image_8c3_hd:true};
      $scope.enabled19={Helx_8c3_hd:true};
      $scope.enabled20={Helx_7cf1:true};
      $scope.enabled21={Helx_mc94:true};
      $scope.enabled23={Helx_8l6_hd:true};
      $scope.enabled26={Hud:true};
      $scope.enabled27={Sw_vc31a:true};
      $scope.enabled31={Led_monitor:true};
      $scope.enabled32={Wireless_dicom:true};

      $scope.S1000 = function(){
        $scope.enabled1000={S1000:true};
        $scope.enabled15={Cadence_contrast:true};
        $scope.enabled20={Helx_7cf1:true};
        $scope.enabled21={Helx_mc94:true};
        $scope.enabled23={Helx_8l6_hd:true};
        $scope.enabled26={Hud:true};
        $scope.enabled31={Led_monitor:true};
        $scope.enabled32={Wireless_dicom:true};
        $scope.enabled37={Powerscribe_360:true};
        $scope.active={vc30a:true};
      }
      $scope.S2000 = function(){
          $scope.enabled2000={S2000:true};
          $scope.enabled9={Vt_iq:true};
          $scope.enabled15={Cadence_contrast:true};
          $scope.enabled20={Helx_7cf1:true};
          $scope.enabled21={Helx_mc94:true};
          $scope.enabled26={Hud:true};
          $scope.enabled31={Led_monitor:true};
          $scope.enabled32={Wireless_dicom:true};
          $scope.enabled37={Powerscribe_360:true};
          $scope.active={vc30a:true};
      }
      $scope.S3000 = function(){
        $scope.enabled3000={S3000:true};
        $scope.enabled10={Esie_fusion:true};
        $scope.enabled11={Esie_guide:true};
        $scope.enabled15={Cadence_contrast:true};
        $scope.enabled20={Helx_7cf1:true};
        $scope.enabled21={Helx_mc94:true};
        $scope.enabled26={Hud:true};
        $scope.enabled31={Led_monitor:true};
        $scope.enabled32={Wireless_dicom:true};
        $scope.enabled37={Powerscribe_360:true};
        $scope.active={vc30a:true};
      }
  }
  $scope.vc31a = function() {
      $scope.menu_enabled5={vc31a:true};
      $scope.active={vc31a:true};
      $scope.enabled3={Linear_release:true};
      $scope.enabled14={Sie_stream_hd:true};
      $scope.enabled29={Sw_hw_vd10a:true};
      $scope.enabled30={Sw_vd10a:true};
      $scope.enabled25={Helx_12l4_transducer:true};
      $scope.enabled33={Cti_standard:true};
      //$scope.enabled34={Windows_7:true};
      $scope.enabled22={Optimized_18l6_hd:true};
      $scope.enabled24={Color_doppler_9l4:true};
      $scope.enabled18={Image_6c1_18l6_4v1c:true};

        $scope.S1000 = function(){
          $scope.menu_enabled5={vc31a:true};
          $scope.active={vc31a:true};
          $scope.enabled3={Linear_release:true};
          $scope.enabled14={Sie_stream_hd:true};
          $scope.enabled29={Sw_hw_vd10a:true};
          $scope.enabled30={Sw_vd10a:true};
          $scope.enabled25={Helx_12l4_transducer:true};
          $scope.enabled33={Cti_standard:true};
          //$scope.enabled34={Windows_7:true};
          $scope.enabled22={Optimized_18l6_hd:true};
          $scope.enabled24={Color_doppler_9l4:true};
          $scope.enabled18={Image_6c1_18l6_4v1c:true};
        }
        $scope.S2000 = function(){
          $scope.menu_enabled5={vc31a:true};
          $scope.active={vc31a:true};
          $scope.enabled3={Linear_release:true};
          $scope.enabled14={Sie_stream_hd:true};
          $scope.enabled29={Sw_hw_vd10a:true};
          $scope.enabled30={Sw_vd10a:true};
          $scope.enabled25={Helx_12l4_transducer:true};
          $scope.enabled33={Cti_standard:true};
          //$scope.enabled34={Windows_7:true};
          $scope.enabled22={Optimized_18l6_hd:true};
          $scope.enabled24={Color_doppler_9l4:true};
          $scope.enabled18={Image_6c1_18l6_4v1c:true};
        }
        $scope.S3000 = function(){
          $scope.menu_enabled5={vc31a:true};
          $scope.active={vc31a:true};
          $scope.enabled3={Linear_release:true};
          $scope.enabled14={Sie_stream_hd:true};
          $scope.enabled29={Sw_hw_vd10a:true};
          $scope.enabled30={Sw_vd10a:true};
          $scope.enabled25={Helx_12l4_transducer:true};
          $scope.enabled33={Cti_standard:true};
          //$scope.enabled34={Windows_7:true};
          $scope.enabled22={Optimized_18l6_hd:true};
          $scope.enabled24={Color_doppler_9l4:true};
          $scope.enabled18={Image_6c1_18l6_4v1c:true};
        }
  }
  $scope.vd10a = function() {
      $scope.menu_enabled={vd10a:true};
      $scope.active={vd10a:true};
      $scope.enabled18={Image_6c1_18l6_4v1c:true};
      $scope.enabled34={Windows_7:true};
      $scope.enabled14={Sie_stream_hd:true};
      $scope.enabled4={Helx_touch_control:true};
      $scope.enabled35={New_control_panel:true};
      $scope.enabled36={Touch_display:true};

      $scope.S1000 = function(){
        $scope.menu_enabled={vd10a:true};
        $scope.active={vd10a:true};
        $scope.enabled18={Image_6c1_18l6_4v1c:true};
        $scope.enabled34={Windows_7:true};
        $scope.enabled14={Sie_stream_hd:true};
        $scope.enabled4={Helx_touch_control:true};
        $scope.enabled35={New_control_panel:true};
        $scope.enabled36={Touch_display:true};
      }
      $scope.S2000 = function(){
        $scope.menu_enabled={vd10a:true};
        $scope.active={vd10a:true};
        $scope.enabled18={Image_6c1_18l6_4v1c:true};
        $scope.enabled34={Windows_7:true};
        $scope.enabled14={Sie_stream_hd:true};
        $scope.enabled4={Helx_touch_control:true};
        $scope.enabled35={New_control_panel:true};
        $scope.enabled36={Touch_display:true};
      }
      $scope.S3000 = function(){
        $scope.menu_enabled={vd10a:true};
        $scope.active={vd10a:true};
        $scope.enabled18={Image_6c1_18l6_4v1c:true};
        $scope.enabled34={Windows_7:true};
        $scope.enabled14={Sie_stream_hd:true};
        $scope.enabled4={Helx_touch_control:true};
        $scope.enabled35={New_control_panel:true};
        $scope.enabled36={Touch_display:true};
      }

  }
})

.controller('SlideController', function($scope,  $ionicSlideBoxDelegate, $ionicPopover) {

  // Description Popover Controller
  $ionicPopover.fromTemplateUrl('templates/description.html', {
    scope: $scope,
    animation: 'popIn'
    }).then(function(popover) {
    $scope.popover = popover;
    });

  $scope.Description = function($descriptionEvent) {
    $scope.popover.show($descriptionEvent);
  };
  $scope.closeDescription = function($descriptionEvent) {
    $scope.popover.hide($descriptionEvent);
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function($descriptionEvent) {
    $scope.popover.remove($descriptionEvent);
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

    $scope.lockSlide = function () {
       $ionicSlideBoxDelegate.enableSlide( false );
    }

			function showBanner(index) {
				var oldElm = document.querySelector('.slider ion-slide.slider-slide.current');
				var q = '.slider ion-slide.slider-slide[data-index="' + index + '"]';
				var elm = document.querySelector(q);

        $scope.nextSlide = function() {
          $scope.activeSlide = index + 1 ;
        };
        $scope.prevSlide = function() {
          $scope.activeSlide = index - 1 ;
        };
        $scope.closeSlide = function() {
          $scope.activeSlide = index = 0 ;
        };

        //Go to Feature from icon click
        $scope.feature1 = function() {
          $scope.activeSlide = index = 1 ;
        };
        $scope.feature2 = function() {
          $scope.activeSlide = index = 2 ;
        };
        $scope.feature3 = function() {
          $scope.activeSlide = index = 3 ;
        };
        $scope.feature4 = function() {
          $scope.activeSlide = index = 4 ;
        };

        $scope.prevButton={Ctrl:false};
        $scope.nextButton={Ctrl:false};

        $scope.featureSlide={Ctrl:true};
        console.log("This slide is " + index);

				// Remove class "current"
				if (null !== oldElm) {
					oldElm.classList.remove("current");
				};
				// Add class "current" to current slide
				if (null !== elm) {
					elm.classList.add("current");
				};
        // Adds prev next slide ctrls with close button
        if ( index >= 1  ) {
          $scope.featureSlide={Ctrl:false};
        };
        if ( index == 1  ) {
            $scope.prevButton={Ctrl:true};
        };
        if ( index == 4  ) {
          $scope.nextButton={Ctrl:true};
        };

			};
      			$scope.activeSlide = 0;

            setTimeout(function() {
      				showBanner($scope.activeSlide);
      			}, 0);

			$scope.slideChanged = showBanner;
})

.controller('DataSlideController', function($scope, $ionicModal, $state, $ionicSlideBoxDelegate, $ionicViewSwitcher) {
  // Description HELX Overview Modal Controller
  $ionicModal.fromTemplateUrl('templates/modals/helx-usability.html', {
    scope: $scope,
    animation: 'popIn'
    }).then(function(modal) {
      $scope.modal = modal;
      if($state.is('app.data')){
           $scope.modal.show();
           $scope.hide={Dataslider:true};
        }
  });
  $scope.close={Modal:false};

  $scope.usabilityModal = function($usabilityModalEvent) {
    $scope.modal.show($usabilityModalEvent);
  }
  $scope.closeusabilityModal = function($usabilityModalEvent) {
    $scope.modal.hide($usabilityModalEvent);
    $scope.close={Modal:true};
    $scope.hide={Dataslider:false};
  }
  $scope.$on('modal.hidden', function() {
    $scope.close={Modal:true};
    $scope.hide={Dataslider:false};
  });

	function showDataSlide(index) {
    var oldElm = document.querySelector('.slider ion-slide.slider-slide.current');
    var q = '.slider ion-slide.slider-slide[data-index="' + index + '"]';
    var elm = document.querySelector(q);

        $scope.prevSlide = function() {
          $scope.activeSlide = index - 1 ;
        };
        $scope.nextSlide = function() {
          $scope.activeSlide = index + 1 ;
        };
        $scope.closeSlide = function() {
          $scope.activeSlide = index = 0 ;
        };
		}
    $scope.activeSlide = 0;

    setTimeout(function() {
      showDataSlide($scope.activeSlide);
    }, 0);

    $scope.slideChanged = showDataSlide;
})

.controller( 'HideCtrl', function($scope, $state, $stateParams ) {
  $scope.$on('$ionicView.enter', function(e) {
      $scope.hideMenu = true;
      console.log('Sub Menu button was removed, sucka!');
   });
})

.run(function($ionicPlatform, $ImageCacheFactory, $rootScope) {
  $ionicPlatform.ready(function() {

    $ImageCacheFactory.Cache([
      // Images folder
        "../img/360-icon.png",
        "../img/acuson-S3000-large.png",
        "../img/acuson-S2000-large.png",
        "../img/acuson-S1000-large.png",
        "../img/blue-icon.png",
        "../img/chevron.png",
        "../img/clinical-icon-black.png",
        "../img/clinical-icon.png",
        "../img/data-proof-1.png",
        "../img/data-proof.png",
        "../img/effectiveness.png",
        "../img/feature-icon.png",
        "../img/helx-logo-touch-control.png",
        "../img/literature-dark-icon.png",
        "../img/literature-icon.png",
        "../img/orange-icon.png",
        "../img/pink-icon.png",
        "../img/media-icon.png",
        "../img/preference-chart.png",
        "../img/quiz-correct.png",
        "../img/quiz-star-outline.png",
        "../img/quiz-star.png",
        "../img/quiz-wrong.png",
        "../img/resource-lg.png",
        "../img/resource.png",
        "../img/sales-icons.png",
        "../img/satisfaction-rating.png",
        "../img/siemens.png",
        "../img/tool-icon.png",
        "../img/transparent.png",
        "../img/tree-lg.png",
        "../img/tree.png",
        "../img/ultrasound.png",
        "../img/usability-scale.png",
        "../img/workflow.png",
        "../img/splash-bg.jpg",
        "../img/bg.jpg",
        "../img/couple-bg.jpg",
        "../img/gray-gradient.jpg",
        "../img/helix-machine-bg.jpg",
        "../img/helx-closeup.jpg",
        "../img/HELX-placeholder.jpg",
        "../img/helx-system-bg.jpg",
        "../img/main-bg.jpg",
        "../img/quiz-bg.jpg",
        "../img/ultrasound-worker-bg.jpg",
        "../img/ultrasound-worker-blurry-bg.jpg",
        "../img/workflow-bg.jpg",

        //Quiz
        "img/quiz-star-outline.png",
        "img/quiz-star.png",
        "img/quiz-hero.png",
        "img/quiz-rank-star.png",
        "img/trophies/helx-machine.png",

         // Accessories Folder
           "../img/accessories/4c1.png",
           "../img/accessories/4v1c.png",
           "../img/accessories/6c1hd.png",
           "../img/accessories/7cf1.png",
           "../img/accessories/8c3hd.png",
           "../img/accessories/9l4.png",
           "../img/accessories/12l4.png",
           "../img/accessories/14l5.png",
           "../img/accessories/18L6.png",
           "../img/accessories/18l6hd.png",
           "../img/accessories/mc9-4.png",

         // Footer Folder
           "../img/footer/acuson-S1000.png",
           "../img/footer/acuson-S2000.png",
           "../img/footer/acuson-S3000.png",
           "../img/acuson-side-view.jpg",

         // helx details folder
         "../img/helx-details/HELX_WorkflowInnovation.jpg",
         "../img/helx-details/HELX_GelWarmer.jpg",
         "../img/helx-details/HELX_ControlPanel.jpg",
         "../img/helx-details/HELX_WorkflowInnovation.jpg"



     ]).then(function(){
         console.log("Images done loading!");
     },function(failed){
         console.log("An image cahce failed: "+failed);
     });

     $rootScope.online = navigator.onLine ? 'online' : 'offline';
     $rootScope.$apply();

     if (window.addEventListener) {
       window.addEventListener("online", function() {
         $rootScope.online = "online";
         $rootScope.$apply();
         console.log('online');
       }, true);
       window.addEventListener("offline", function() {
         $rootScope.online = "offline";
         $rootScope.$apply();
         console.log('offline');
       }, true);
     } else {
       document.body.ononline = function() {
         $rootScope.online = "online";
         $rootScope.$apply();
         console.log('online');
       };
       document.body.onoffline = function() {
         $rootScope.online = "offline";
         $rootScope.$apply();
         console.log('offline');
       };
     }


    })
});
