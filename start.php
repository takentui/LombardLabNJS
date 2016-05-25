<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
<head>
	<title>Ломбард</title>
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
    <script src="js/jquery-2.2.2.min.js"></script>
		<script src="js/jquery-ui.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css">
</head>
<style>
body {
    background-image: url('img/lombard-bg.jpg')
}
</style>
<body>
    <script>
        $(document).ready(function() {
            $('#login-modal').modal({})
            $("#login").on('click', function() {
                $("#form-login").submit();
            });
        });
    </script>

	<div class="container">
    <div class="modal fade" id="login-modal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Login</h4>
              </div>
              <div class="modal-body">
                  <form role="form" name="loginform" id="form-login" method="post" action="index.php">
                  <div class="form-group">
                    <label for="username">Login</label>
                    <input type="text" class="form-control" id="username"  name="username" placeholder="Enter login">
                  </div>
                  <div class="form-group">
                    <label for="userpass">Password</label>
                    <input type="password" class="form-control" id="userpass" placeholder="Password">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                 <button type="button" class="btn btn-primary" id="login">Login</button>
              </div>
            </div>
          </div>
    </div>

    </div>
</body>
<html>
