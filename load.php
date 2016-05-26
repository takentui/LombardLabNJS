<?php

    $searchcolumn = '';
    $searchstring = '';

	session_start();

	$table=$_POST['table'];
    if ( isset($_POST['searchcolumn']))
        $searchcolumn=$_POST['searchcolumn'];
    if ( isset($_POST['searchstring']))
        $searchstring=$_POST['searchstring'];

    //
	// $username = $_SESSION['username'];
	// $userpass = $_SESSION['userpass'];
    //
	// require "connect.php";
	// $link = getDbConnection($username, $userpass);
    //
	// $query="select * from [MKB].[WUD\Solovev4].[".$table."]";
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
    // $rows = array();
    // while($r = mysqli_fetch_assoc($rs)) {
    //     $rows[] = $r;
    // }
    // print json_encode($rows);

    $columns = array();

    switch($table) {
        case 'table':
            $column1 = array('id' => 'lol', 'name' => 'MyName', 'type' => 'number' );
            $column2 = array('id' => 'col2', 'name' => 'Numberic', 'type' => 'number' );
            $column3 = array('id' => 'col3', 'name' => 'Text', 'type' => 'text' );
            $column4 = array('id' => 'col4', 'name' => 'DropDown', 'type' => 'dropdown', 'foreignTable' => 'FT' );
            $columns = array($column1, $column2, $column3, $column4);
        break;
        default:
        break;
    }
    $record1 = array('id' => 1,'lol' => 123, 'col2' => 228, 'col3' => 'Azaza', 'col4' => 2);
    $record2 = array('id' => 2,'lol' => 123, 'col2' => 228, 'col3' => 'Azaza', 'col4' => 1);
    $record3 = array('id' => 3,'lol' => 123, 'col2' => 228, 'col3' => 'Azaza', 'col4' => 3);
    $record4 = array('id' => 4,'lol' => 123, 'col2' => 228, 'col3' => 'Azaza', 'col4' => 4);

    $result = array('columns' => array($column1, $column2, $column3, $column4), 'records' => array( $record1, $record2, $record3, $record4));
    echo json_encode($result);

?>
