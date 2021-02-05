<?php
function redirect($location){
    header("Location: ".$location);
    exit;
}

function query($query){
    global $connection;
    $result = mysqli_query($connection, $query);
    confirmQuery($result);
    return $result;
}

function fetchRecords($result){
    return mysqli_fetch_array($result);
}

function ifItIsMethod($method=null){
    if ($_SERVER['REQUEST_METHOD'] == strtoupper($method)){
        return true;
    }
    return false;
}

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

?>