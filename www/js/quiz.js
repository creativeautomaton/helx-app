
// Quiz Controller
angular.module('quizApp', ['ngCookies'])

.controller('QuizCtrl', function (
  $scope, $http, $location,
  $timeout, $ionicModal,
  $state, $ionicSlideBoxDelegate,
  $cookieStore, $cookies, $filter
  ) {

    // var expireDate = new Date();
      //expireDate.setDate(expireDate.getDate() + 1);
     // Setting a cookie
    // $cookies.put('highest_streak', {'expires': expireDate});

    $scope.mode = 'quiz';
    $scope.itemsPerPage = 1;

    $scope.show={result:true};
    $scope.show={Wrong:false};
    $scope.show={Timesup:false};
    $scope.show={question:false};
    $scope.hide={Question:false};
    $scope.reached={Star:false};
    $scope.helx={Hero:false};
    // Hgh Streak Stars and Stats
    $scope.current_streak = 0;
    $scope.star_score = 0;

    var date = $filter('date')(date, "h 'in the morning'");

    $scope.currentDate = date;
    $cookieStore.put('date', $scope.currentDate );

    var highest_streak_cookie = $cookieStore.get('highest_streak');
    if ($cookieStore.get('highest_streak') == undefined){
      $cookieStore.put('highest_streak', 0);
    }else{
      $scope.highest_streak = $cookieStore.get('highest_streak');
    }

    var star_score_cookie = $cookieStore.get('star_score');
    if ( $cookieStore.get('star_score') == undefined) {
      $cookieStore.put('star_score', 0);
      $scope.remaining_Answers = 10 ;
    }else if( $cookieStore.get('star_score') < 0 ){
      $scope.star_score = $cookieStore.get('star_score');
      $cookieStore.put('star_score', $scope.star_score );
    }

    $scope.currentPage = Math.floor( (Math.random() * 100))+ 1;

    // On page load this function happens
    $scope.$on('$ionicView.enter', function(e) {

      $cookieStore.put('quiz_started', true  );
      $scope.quiz_started = $cookieStore.get('quiz_started');

      if ($cookieStore.get('highest_streak') == undefined){
        $cookieStore.put('highest_streak', 0  );
      }

      var star_score_cookie = $cookieStore.get('star_score');
      if ( $cookieStore.get('star_score') == undefined) {
        $cookieStore.put('star_score', 0  );
        $scope.remaining_Answers = 10 ;
      }else if( $cookieStore.get('star_score') < 0 ){
        $scope.star_score = $cookieStore.get('star_score');
        $cookieStore.put('star_score', $scope.star_score   );
      }

      var highest_streak_cookie = $cookieStore.get('highest_streak');
      if ($cookieStore.get('highest_streak') == undefined){
        $cookieStore.put('highest_streak', 0  );
      }else{
        $scope.highest_streak = $cookieStore.get('highest_streak');
      }

          // for star changes and high streak counts
             if ( star_score_cookie > 9 ) {
                 $scope.stars =  [
                   { src: '/img/quiz-star.png', id: 1 }
                 ];
              }
              if ( star_score_cookie > 24  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 }
                ];
              }
              if ( star_score_cookie > 49  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 },
                  { src: '/img/quiz-star.png', id: 3 }
                ];
              }
              if ( star_score_cookie > 74  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 },
                  { src: '/img/quiz-star.png', id: 3 },
                  { src: '/img/quiz-star.png', id: 4 }
                ];
              }
              if ( star_score_cookie > 99  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 },
                  { src: '/img/quiz-star.png', id: 3 },
                  { src: '/img/quiz-star.png', id: 4 },
                  { src: '/img/quiz-star.png', id: 5 }
                ];
              }

      console.log('This is Question: ' +  $scope.currentPage  );
    });

    $scope.stars =  [
      { src: '/img/transparent.png', id: 1 },
      { src: '/img/transparent.png', id: 2 },
      { src: '/img/transparent.png', id: 3 },
      { src: '/img/transparent.png', id: 4 }
    ];


    $scope.counter = 0;
     $scope.onTimeout = function(){
         $scope.counter++;
         if ($scope.counter < 10) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
              $scope.Timesup();
        }
     }
     var mytimeout = $timeout($scope.onTimeout,1000);


     $scope.RandomQuote = function(length){
        return Math.floor(Math.random() * length);
      }
      $scope.CorrectQuotes = [
          {   value: "WOW! You're doing great!"    },
          {   value: "Amazing! Keep it up!"        },
          {   value: "Don't Stop me now!"          },
          {   value: "Shazzaamm!!!!"               }
      ];
      $scope.WrongQuotes = [
          {   value: "Man, that was sad."           },
          {   value: "You are not a HELX Hero."     },
          {   value: "You need more practice."      },
          {   value: "Not even close."              }
      ];


    $scope.loadQuiz = function (file) {
        $http.get(file)
         .then(function (res) {
             $scope.quiz = res.data.quiz;
             $scope.questions = res.data.questions;
             $scope.totalItems = $scope.questions.length;
             $scope.questionId = res.data.questions.Id;
             $scope.currentPage = Math.floor( (Math.random() * 100))+ 1;
             $scope.correctAnswer = res.data.questions.correctAnswer;

             $scope.$watch('currentPage + itemsPerPage', function () {
                 var begin = (($scope.currentPage) * $scope.itemsPerPage),
                   end = begin + $scope.itemsPerPage;

                 $scope.filteredQuestions = $scope.questions.slice(begin, end);
             });
         });
    };

    $scope.loadQuiz('data/quiz.json');

    $scope.Correct = function (index, timeout) {

        $scope.counter = 0;

        $scope.current_streak += 1;

        if($scope.current_streak > $scope.highest_streak ){
            $scope.highest_streak += 1;
        }

        $cookieStore.put('current_streak', $scope.current_streak  );
        $scope.current_streak_cookie = $cookieStore.get('current_streak');

        $cookieStore.put('highest_streak', $scope.highest_streak  );
        $scope.highest_streak = $cookieStore.get('highest_streak');

        // Question Id and the correctly answered question is given a cookie ID
          var question_Id = $scope.currentPage;
            $scope.questionAnsweredID = $cookieStore.put('question_Id', $scope.currentPage  );
            $scope.questionAnswered = $cookieStore.put('question_Correct_'+question_Id, $scope.currentPage   );

              $scope.question_answer_cookie = $cookieStore.get('question_Correct_'+question_Id );

              if($scope.question_answer_cookie !== $scope.currentPage){

              }else{
                $scope.star_score += 1;
                $cookieStore.put('star_score', $scope.star_score);
              }

              // for star changes and high streak counts
             if ($scope.star_score > 9 ) {
                 $scope.stars =  [
                   { src: '/img/quiz-star.png', id: 1 }
                 ];
              }
              if ( $scope.star_score > 24 ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 }
                ];
              }
              if ( $scope.star_score > 49  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 },
                  { src: '/img/quiz-star.png', id: 3 }
                ];
              }
              if ( $scope.star_score > 74  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 },
                  { src: '/img/quiz-star.png', id: 3 },
                  { src: '/img/quiz-star.png', id: 4 }
                ];
              }
              if ( $scope.star_score > 99  ) {
                $scope.stars =  [
                  { src: '/img/quiz-star.png', id: 1 },
                  { src: '/img/quiz-star.png', id: 2 },
                  { src: '/img/quiz-star.png', id: 3 },
                  { src: '/img/quiz-star.png', id: 4 },
                  { src: '/img/quiz-star.png', id: 5 }
                ];
              }

              if ( $scope.star_score == 10 ||
                   $scope.star_score == 25 ||
                   $scope.star_score == 50 ||
                   $scope.star_score == 75
                 ) {
                $timeout(function () {
                   $scope.reached={Star:true};
                }, 560);
                 $scope.continue = function(){
                   $scope.reached={Star:false};
                   $scope.show={Correct:false};
                   $scope.currentPage = Math.floor( (Math.random() * 100) )+ 1;
                 };
             }
             if ( $scope.star_score == 100 ) {
               $timeout(function () {
                  $scope.reached={Hundred:true};
                  $scope.hide={Question:true};
                  $scope.helx={Hero:true};
               }, 560);
                $scope.continue = function(){
                $scope.reached={Hundred:false};
                  $scope.show={Correct:false};
                  $scope.currentPage = Math.floor( (Math.random() * 100) )+ 1;
                };
            }

               $timeout(function () {
                   $scope.hide={Question:true};
                   $scope.show={Correct:true};
                     console.log('Correct!');
                 }, 0);

                 $timeout(function () {
                     $scope.hide={Question:false};
                     $scope.show={Correct:false};
                     $scope.currentPage = Math.floor( (Math.random() * 100) )+ 1;
                     console.log('This is Question: ' +  $scope.currentPage  );
                 }, 800);
    };

    $scope.Wrong = function (index, timeout) {

      $timeout.cancel(mytimeout);


        $scope.hide={Question:true};
        $scope.show={Wrong:true};

        $cookieStore.get('highest_streak');

        if($scope.star_score < 10){
          $scope.remaining_Answers = 10 - ($scope.star_score) ;
        }else if($scope.star_score < 25){
          $scope.remaining_Answers = 25 - ($scope.star_score) ;
        }else if($scope.highest_streak < 50){
          $scope.remaining_Answers = 50 - ($scope.star_score) ;
        }else if($scope.star_score < 75){
          $scope.remaining_Answers = 75 - ($scope.star_score) ;
        }
    };

    $scope.try_again = function (timeout) {

        $timeout(function () {
            $scope.counter = 0;
            var mytimeout = $timeout($scope.onTimeout,1000);

            $scope.hide={Question:false};
            $scope.show={Correct:false};
            $scope.current_streak = 0;
            $scope.currentPage = Math.floor( (Math.random() * 100) )+ 1;
        }, 600);
    };

    $scope.Timesup = function (index, timeout) {

      $timeout.cancel(mytimeout);


        $scope.hide={Question:true};
        $scope.show={Timesup:true};

        $cookieStore.get('highest_streak');

        if($scope.star_score < 10){
          $scope.remaining_Answers = 10 - ($scope.star_score) ;
        }else if($scope.star_score < 25){
          $scope.remaining_Answers = 25 - ($scope.star_score) ;
        }else if($scope.highest_streak < 50){
          $scope.remaining_Answers = 50 - ($scope.star_score) ;
        }else if($scope.star_score < 75){
          $scope.remaining_Answers = 75 - ($scope.star_score) ;
        }
    };


 });
