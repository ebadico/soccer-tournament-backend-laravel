<!DOCTYPE html>
<html ng-app='app'>
<head>
    <title>{{ env('SITENAME') }}</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="bower_components/angular-toastr/dist/angular-toastr.min.css">
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/sb-admin.css">
    <style>
      /* The starting CSS styles for the enter animation */
      .ng-enter {
        transition:0.5s linear all;
        opacity:0;
      }

      /* The finishing CSS styles for the enter animation */
      .ng-enter.ng-enter-active {
        opacity:1;
      }

      .ng-hide-add, .ng-hide-remove {
        transition: all linear .25s;
      }

      .ng-hide {
        opacity: 0;
      }
      .rwd-video {
        height: 0;
        overflow: hidden;
        padding-bottom: 56.25%;
        padding-top: 30px;
        position: relative;
      }
      .rwd-video iframe,
      .rwd-video object,
      .rwd-video embed {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    </style>
</head>
<body style="background:#ECECEC;">
   
  <div ui-view></div>

  <script src='/js/vendors.js'></script>
  <script src="/js/angular-vendors.js"></script>
	<script src="/js/app.core.js"></script>
  <script src="/js/app.module.js"></script>
</body>
</html>
