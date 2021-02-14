<?php include 'functions.php';?>
<?php

if($_SERVER['REQUEST_METHOD'] == "GET"){
    
    $username = $_SESSION['username'];
    $nickname = $_SESSION['nickname'];

    $level = escape($_GET['newLevel']);
    $score = escape($_GET['newScore']);

    $query = "UPDATE `player` SET `score`='$score',`level`='$level' WHERE `username`='$username'";

    $update_user_query = query($query);
    
    if($update_user_query){
        updateSession($nickname, $score, $level);
        redirect("../html/main-menu.php");
    }else{
        redirect("../index.php");
    }
}
?>