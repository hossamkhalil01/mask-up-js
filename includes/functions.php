<?php
include("includes/db.php");

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

// function fetchRecords($result){
//     return mysqli_fetch_array($result);
// }

// function ifItIsMethod($method=null){
//     if ($_SERVER['REQUEST_METHOD'] == strtoupper($method)){
//         return true;
//     }
//     return false;
// }

function escape($data){
    $data = trim($data);
	$data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


function username_exists($username){
    global $connection;
    $query = "SELECT * FROM `player` WHERE `username` = '$username'";
    $result = query($query);
    if (mysqli_num_rows($result) > 0){
        return true;
    }else{
        return false;
    }
}




function register_user($username, $password, $nickname, $avatar){
    global $connection;

    $password = password_hash($password, PASSWORD_BCRYPT, array('cost' => 12));

    $query = "INSERT INTO `player`(`username`, `password`, `nickname`, `score`, `level`) VALUES ('$username', '$password', '$nickname', 0, 0)";

    $register_user_query = query($query);
    

}



function login_user($username, $password){

    global $connection;

    $username = escape($username);
    $password = escape($password);


    $query = "SELECT * FROM `player` WHERE `username` = '{$username}'";

    $select_user_query = query($query);

    $counter = mysqli_num_rows($select_user_query);

    if($counter == 1){
        $row = mysqli_fetch_assoc($select_user_query);
        $db_username = $row['username'];
        $db_user_password = $row['password'];
        $db_user_nickname = $row['nickname'];
        $db_user_score = $row['score'];
        $db_user_level = $row['level'];
        $db_user_avatar = $row['avatar'];

        
        // $password = crypt($password, $db_user_password);

        echo $password;

        if(password_verify($password, $db_user_password)){
            echo "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        }else{
            echo "bbbbbbbbbbbbbbbbbbbbb";
        }

        // if password_verify($password, $db_user_password);



        if(password_verify($password, $db_user_password)){
            $_SESSION['username'] = $db_username;
            $_SESSION['nickname'] = $db_user_nickname;
            $_SESSION['score'] = $db_user_score;
            $_SESSION['level'] = $db_user_level;
            $_SESSION['avatar'] = $db_user_avatar;
            redirect('/JSProject/home.php');
        }
    }

}


function confirmQuery($result){
	global $connection;
	if(!$result){
		die('Query failed '. mysqli_error($connection));
	}
}

function validateRegister($error, $username, $password, $cpassword, $nickname, $avatar){
    if(strlen($username) < 4){
        $error['username'] = 'Username needs to be longer';
    }
    if($username === ''){
        $error['username'] = 'Username cannot be empty';
    }
    if(username_exists($username)){
        $error['username'] = 'Username already exists, pick another one';
    }

    if($password === ''){
        $error['password'] = 'Password cannot be empty';
    }

    
    if(strlen($password) < 6){
        $error['email'] = 'passord should be minimum 6 characters';
    }
    
    if($password !== $cpassword){
        $error['cpassword'] = 'Passwords do not match';
    }


    foreach ($error as $key => $value){
        if (empty($value)){
            unset($error[$key]);
        }
    }
    return $error;
}




?>