<?php session_start(); ?>
<?php
include("db.php");

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


function register_user($username, $password, $nickname){

    global $connection;

    $fileName = "default-avatar.png";

    empty($_FILES["image"]["name"]) ? $image = "images/main-menu/" . $fileName  : $image = $_FILES['image']['tmp_name'];

    $imgContent = addslashes(file_get_contents($image));

    $password = password_hash($password, PASSWORD_BCRYPT, array('cost' => 12));

    $query = "INSERT INTO `player`(`username`, `password`, `nickname`, `score`, `level`, `avatar`, `created_at`) VALUES ('$username', '$password', '$nickname',0,0, '$imgContent', NOW())";

    $register_user_query = query($query);
    
    if($register_user_query){
        return true;
    }
    return false;
}

function update_user($username, $password, $nickname){

    $password = password_hash($password, PASSWORD_BCRYPT, array('cost' => 12));
    $query = "UPDATE `player` SET `password`='$password',`nickname`='$nickname' WHERE `username`='$username'";

    $update_user_query = query($query);
    
    if($update_user_query){
        updateSession($nickname, $_SESSION['score'], $_SESSION['level']);
        return true;
    }
    return false;
   
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

        if(password_verify($password, $db_user_password)){
            $_SESSION['username'] = $db_username;
            $_SESSION['nickname'] = $db_user_nickname;
            $_SESSION['score'] = $db_user_score;
            $_SESSION['level'] = $db_user_level;
            $_SESSION['avatar'] = $db_user_avatar;
            
            return true;
        }
    }

    return false;
}


function confirmQuery($result){
	global $connection;
	if(!$result){
		die('Query failed '. mysqli_error($connection));
	}
}

function validateRegister($error, $username, $password, $cpassword, $nickname){
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
    
    if($password !== $cpassword && strlen($password) >= 6){
        $error['cpassword'] = 'Passwords do not match';
    }

    if(!empty($_FILES["image"]["name"])) {
         // Get file info 
         $fileName = basename($_FILES["image"]["name"]);
         $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

        // Allow certain file formats 
        $allowTypes = array('jpg','png','jpeg','gif');
        
        if(! in_array($fileType, $allowTypes)){
            $error['image'] = "Sorry, only JPG, JPEG, PNG, & GIF files are allowed to upload.";
        }
    }


    foreach ($error as $key => $value){
        if (empty($value)){
            unset($error[$key]);
        }
    }
    return $error;
}

function validateUpdate($error, $nickname, $password, $cpassword){
    if($password === ''){
        $error['password'] = 'Password cannot be empty';
    }

    
    if(strlen($password) < 6){
        $error['email'] = 'passord should be minimum 6 characters';
    }
    
    if($password !== $cpassword && strlen($password) >= 6){
        $error['cpassword'] = 'Passwords do not match';
    }
    foreach ($error as $key => $value){
        if (empty($value)){
            unset($error[$key]);
        }
    }
    return $error;
}


function validateLogin($errorSignIn, $username, $password){

    if($username === ''){
        $errorSignIn['username'] = 'Username cannot be empty';
    }else if(!username_exists($username)){
        $errorSignIn['username'] = 'Username can not be found';
    }

    if($password === ''){
        $errorSignIn['password'] = 'Password cannot be empty';
    }else if(username_exists($username)){
        $errorSignIn['password'] = 'Password is wrong';
    }

    foreach ($errorSignIn as $key => $value){
        if (empty($value)){
            unset($errorSignIn[$key]);
        }
    }
    return $errorSignIn;
}

function updateSession($nickname, $score, $level){
    $_SESSION['nickname'] = $nickname;
    $_SESSION['score'] = $score;
    $_SESSION['level'] = $level;
}


?>