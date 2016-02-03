<!DOCTYPE html>
<html ng-app='app'>
<head>
    <title>Globus Cup</title>
</head>
<body>
   
  <div ui-view></div>

	<script src="bower_components/angular/angular.min.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
	
	<script src="app/init.js"></script>

	<script src="app/login/auth.service.js"></script>
	<script src="app/login/login.controller.js"></script>
	
	<script src="app/user/user.controller.js"></script>

	<script src="app/season/season.service.js"></script>
	<script src="app/season/season.controller.js"></script>

</body>
</html>
