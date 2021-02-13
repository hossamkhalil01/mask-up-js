<?php 'functions.php';?>
<?php

if($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['updateProgress'])){
    
    $username = $_SESSION['username'];
    $nickname = $_SESSION['nickname'];
    $level = escape($_POST['level']);
    $score = escape($_POST['score']);

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

?>