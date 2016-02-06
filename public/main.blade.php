<!DOCTYPE html>
<html ng-app='app'>
<head>
    <title>Globus Cup</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" href="https://raw.githubusercontent.com/theoinglis/ngAnimate.css/master/build/nga.min.css">
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="bower_components/angular-toastr/dist/angular-toastr.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/sb-admin.css">
</head>
<body style="background:#ECECEC;">
   
  <div ui-view></div>

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
  <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

	<!-- ANGULAR -->
	<script src="bower_components/angular/angular.min.js"></script>
  <!-- PLUGIN -->
	<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
  <script src="bower_components/angular-toastr/dist/angular-toastr.tpls.min.js"></script>
  <script src="bower_components/angular-animate/angular-animate.min.js"></script>
	
  <!-- CORE -->
	<script src="app/init.js"></script>

  <!-- MODULES -->
	<script src="app/login/auth.service.js"></script>
	<script src="app/login/login.controller.js"></script>
	
	<script src="app/user/user.controller.js"></script>

	<script src="app/season/season.service.js"></script>
	<script src="app/season/season.controller.js"></script>

  <script src="app/day/day.service.js"></script>
  <script src="app/day/day.controller.js"></script>

	<script src="app/round/round.service.js"></script>
	<script src="app/round/round.controller.js"></script>
  
  <script src="app/team/team.controller.js"></script>
  <script src="app/team/team.service.js"></script>

  <script src="app/player/player.service.js"></script>
  <script src="app/player/player.controller.js"></script>

  <script src="app/match/match.service.js"></script>
  <script src="app/match/match.controller.js"></script>
</body>
</html>
