<?php include 'functions.php';?>
<?php

if($_SERVER['REQUEST_METHOD'] == "GET"){
    
    $username = $_SESSION['username'];
    $nickname = $_SESSION['nickname'];

    $newLevel = escape($_GET['newLevel']);
    $newScore = escape($_GET['newScore']);

    $highestLevelQuery = "SELECT `level` from `player` where `username`='$username'";

    $highestScoreQuery = "SELECT `score` from `player` where `username`='$username'";

    $levelResultQuery = query($highestLevelQuery);
    $row = mysqli_fetch_assoc($levelResultQuery);
    $highestLevel = $row["level"];

    $scoreResultQuery = query($highestScoreQuery);
    $row = mysqli_fetch_assoc($scoreResultQuery);
    $highestScore = $row["score"];


    if ($newLevel > $highestLevel || ( ($newLevel == $highestLevel) && ($newScore > $highestScore) )) {
        $query = "UPDATE `player` SET `score`='$newScore',`level`='$newLevel' WHERE `username`='$username'";
        $update_user_query = query($query);
        if($update_user_query){
            updateSession($nickname, $newScore, $newLevel);
        }else{
            redirect("../index.php");
        }
    }
    redirect("../html/main-menu.php");

}
?>