<?php

session_start();

$username = $_SESSION['username'];
$userpass = $_SESSION['userpass'];

require "connect.php";
$link = getDbConnection($username, $userpass);

$fields="";
$values="";

foreach($_GET as $key => $value)
{
	$fields = $fields.", [$key]";
	$values = $values.",'$value'";
}

$fields = substr($fields,1);
$values = substr($values,1);

$q="insert into [MKB].[WUD\Solovev4].[".$_GET['table']."] ($fields) values ($values)";

try {
    $result= mssql_query($q) or die("Ошибка при добавлении записи в таблицу ".$_SESSION['table'].": ".mssql_get_last_message());
    json_encode($result);
}
catch (Exception $e) {
    echo json_encode($e);
}


mssql_close($link);
?>
