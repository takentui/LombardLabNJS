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
	<script src="js/client.js"></script>
</head>

<body>

<?php
//phpinfo();
	if (isset($_REQUEST['username']) and isset($_REQUEST['userpass']))
	{
		$username = $_REQUEST['username'];
		$userpass = $_REQUEST['userpass'];
		if (($username=='User_Solovev4' or $username=='User1_Solovev4') and $userpass=='1234567')
		{
			session_start();
			$_SESSION['username'] = $username;
			$_SESSION['userpass'] = $userpass;
            echo "<div class=\"container\" id=\"main-content\"></div>";
		}
		else {
			echo "<H4> Пароль или логин введен неверно !</H4>";
		}
	}
	echo "<H3> <a href=start.php>Назад</a></H3></p>";


?>
</body>
</html>
