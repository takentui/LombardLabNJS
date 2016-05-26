<?php

	session_start();

	$table=$_POST['table'];

    //
	// $username = $_SESSION['username'];
	// $userpass = $_SESSION['userpass'];
    //
	// require "connect.php";
	// $link = getDbConnection($username, $userpass);
    //
	// $query="select [id], [name] from [MKB].[WUD\Solovev4].[".$table."]";
	// if (isset($searchcolumn) && $searchcolumn != "")
	// {
    //
	// 	if (isset($searchstring) && $searchstring != "")
    //     {
    //         $query=$query." where ";
    //         $query=$query."[".$searchcolumn."] like '%".$searchstring."%' ";
    //     }
	// }
	// $rs=mssql_query($query) or die('Произошла ошибка загрузки данных: '.mssql_get_last_message());
    //
    // $result = array();
    // while($r = mysqli_fetch_assoc($rs)) {
    //         $result[] = array('id' => $r[0] , 'name' => $r[1]);
    //     }
    // print json_encode($rows);

    $res1 = array('id' => 1, 'name' => 'name1');
    $res2 = array('id' => 2, 'name' => 'name2');
    $res3 = array('id' => 3, 'name' => 'name3');
    $res4 = array('id' => 4, 'name' => 'name4');

    $records = array($res1, $res2, $res3, $res4);

    $result = array('table' => $table , 'records' => $records);
    echo json_encode($result);

?>
