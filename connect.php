<?php
    function getDbConnection($user, $pass) 
	{
		error_reporting( E_ERROR );

		$link = mssql_connect ("dbserverv",$user,$pass) or die ("Error of connecting to DBServer! ".mssql_get_last_message());
			if (!$link) {
				die('Could not connect: '.mssql_get_last_message());
		}
		mssql_select_db("[MKB]",$link);
		mssql_query('SET ANSI_NULLS ON');
		mssql_query('SET ANSI_WARNINGS ON');
		return $link;
   }
?>

