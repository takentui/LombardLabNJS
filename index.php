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
	<script src="js/table.js"></script>
</head>
<style>

.delete-btn {
    cursor: pointer;
}
body {
    background-image: url('img/lombard-bg.jpg')
}
.container {
    background-color: white;
}
</style>



<body>

<?php
//phpinfo();
echo "<div class=\"container\" id=\"main-content\"></div>";
	if (isset($_REQUEST['username']) and isset($_REQUEST['userpass']))
	{
		$username = $_REQUEST['username'];
		$userpass = $_REQUEST['userpass'];
		if (($username=='User_Solovev4' or $username=='User1_Solovev4') and $userpass=='1234567')
		{
			session_start();
			$_SESSION['username'] = $username;
			$_SESSION['userpass'] = $userpass;

		}
		else {
			echo '<div class="alert alert-danger" style="display: none;" id="alert-danger">strong>Внимание!</strong><div id="alert-danger-text">Пароль или логин введен неверно !</div><div>';
		}
	}


?>

<div class="alert alert-success" style="display: none;" id="alert-success">
  <strong>Поздравляем!</strong>
  <div id="alert-success-text"></div>
</div>
<div class="alert alert-danger" style="display: none;" id="alert-danger">
  <strong>Внимание!</strong><div id="alert-danger-text"></div>
</div>
</body>
</html>
