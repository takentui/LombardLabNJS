<?php
session_start();

// $username = $_SESSION['username'];
// $userpass = $_SESSION['userpass'];
//
// require "connect.php";
// $link = getDbConnection($username, $userpass);
//
// $delete ="delete  from [MKB].[WUD\Morozov1].[".$_SESSION['table']."]  where ".$_SESSION['columnid']."={$_GET['id']}";
// //echo $delete;
// $rs=mssql_query($delete) or die('ошибка при удалении: '.mssql_get_last_message());
$arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);

    echo json_encode($arr)
?>
