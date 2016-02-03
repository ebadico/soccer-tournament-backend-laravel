<!DOCTYPE html>
<html ng-app='app'>
<head>
    <title>Globus Cup</title>
</head>
<body>
   
  <div ui-view></div>

	<script src="bower_components/angular/angular.min.js"></script>
	<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
	
	<script src="js/init.js"></script>

	<script src="js/services/auth.factory.js"></script>
	
	<script src="js/controllers/login.controller.js"></script>
	<script src="js/controllers/user.controller.js"></script>


</body>
</html>
