<!-- <?php session_start() ?>
<?php 
	if(!isset($_SESSION['username'])){
		header("Location: ../index.php");
    }?> 
-->

<!Doctype html>

<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>Mask Up</title>
        <meta name="description" content="A covid 19 game built with javascript">
        <meta name="author" content="Hossam Khalil">

        <link rel="stylesheet" href="../css/game-styles.css">

    </head>
    <body>
    <img src="../images/game/mute.png" id="mute" width="50px" height="50px"></img>


    <div class="overlay" id="endGameContainer">
        <div class="popup">
            <h3>The virus got you &#9785;, we hope you get well soon, remember to isolate yourself</h3>
            <img src="../images/game/game-over-icon.jpg" alt="GameOver">
            <div class="text-right">
                <a href="game.php" class="btn btn-try-again"> Try Again</a>
                <a href=""  id="saveButton" name="saveButton" class="btn btn-back-menu"> Back to Main Menu</a>
            </div>
        </div>
    </div>

        <canvas
                width="1900" height="800"
                id="mainCanvas" class="main-canvas"></canvas>

        <script src="../js/game/engine.js"></script>
        <script src="../js/game/game.js"></script>
        <script src="../js/game/view.js"></script>
        <script src="../js/game/model.js"></script>
        <script src="../js/game/controller.js"></script>
        <script src="../js/game/main.js"></script>

    </body>
</html>