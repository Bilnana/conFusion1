'use strict';

angular.module('confusionApp')

         .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
             
            $scope.tab = 1;
            $scope.filtText = '';
             $scope.showMenu = false;
            $scope.message = "Loading ...";
                        menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
             
			
			  
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])
		

        .controller('ContactController',['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])
		

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
		

     .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
           
           $scope.showDish = false;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
                    }])

					
		
	 .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.comment={rating:5,comment:"",author:"", date:""};
			 
			
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                $scope.comment.date =new Date().toISOString();
                 console.log($scope.mycomment);
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.comment);
                
                //Step 4: reset your form to pristine
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
				$scope.commentForm.setPristine();
				
                //Step 5: reset your JavaScript object that holds your comment
				$scope.comment={rating:5, comment:"",author:"",date:""};
				
                   
            }
			 
        }])
		
		.controller('IndexController', ['$scope', '$stateParams', 'menuFactory','corporateFactory' , function($scope, $stateParams, menuFactory, corporateFactory) {

				
               $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                      
				
                   $scope.showPromotion = false;
                            $scope.message="Loading ...";
                            $scope.promotion = menuFactory.getPromotion().get({id:0})
                            .$promise.then(
                                function(response){
                                    $scope.promotion = response;
                                    $scope.showPromotion = true;
                                },
                                function(response) {
                                    $scope.message = "Error: "+response.status + " " + response.statusText;
                                }
                            );

				
            
               
                       $scope.showLeader = false;
                                $scope.message="Loading ...";
                                $scope.leader = corporateFactory.getLeaders().get({id:3})
                                .$promise.then(
                                    function(response){
                                        $scope.leader = response;
                                        $scope.showLeader = true;
                                    },
                                    function(response) {
                                        $scope.message = "Error: "+response.status + " " + response.statusText;
                                    }
                                );
          
		}])
		
		.controller('AboutController', ['$scope', '$stateParams','corporateFactory' , function($scope, $stateParams, corporateFactory) {

            
				
                $scope.showLeaders= false;
                $scope.message = "Loading ...";
                        $scope.leaders=corporateFactory.getLeaders().query(
                    function(response) {
                        $scope.leaders= response;
                        $scope.showLeaders= true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    });

		}]);
	
	
	
	
	