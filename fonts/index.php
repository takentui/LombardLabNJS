<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
<head>
	<title>�������</title>
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
    <script src="js/jquery-2.2.2.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css">
	<script src="js/client.js"></script>
</head>

<body  bgcolor="#aad5f7">

<?php
//phpinfo();
	if (isset($_REQUEST['username']) and isset($_REQUEST['userpass']))
	{
		$username = $_REQUEST['username'];
		$userpass = $_REQUEST['userpass'];
		if (($username=='User_Onishchuk' or $username=='User1_Onishchuk') and $userpass=='1234567')
		{
			session_start();
			$_SESSION['username'] = $username;
			$_SESSION['userpass'] = $userpass;

			echo "<center> <H1> <font color='blue'>�� ������</font></H1> </center>";
			echo "<H3> <a href=Lekarstvo.php?table=���������&searchcolumn1=��������&searchcolumn2=��������_�����������_��������>���������</a></H3>";
			echo "<H3> <a href=Lekarstvo.php>�������</a></H3>";
			echo "<H3> <a href=Lekarstvo.php>�������</a></H3>";
			echo "<H3> <a href=Lekarstvo.php>������</a></H3>";
			echo "<H3> <a href=Lekarstvo.php>��������</a></H3>";
		}
		else {
			echo "<H4> ������ ��� ����� ������ ������� !</H4>";
		}
	}
	echo "<br><br><br><H3> <a href=start.php>�����</a></H3></p>";


?>
</body>
</html>
