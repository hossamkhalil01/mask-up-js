
<?php session_start() ?>
<?php 
	if(!isset($_SESSION['username'])){
		header("Location: ../index.php");
    }
?>
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

        <div id="endGameContainer" class="form-container">
            <button><a href="game.php">Try Again</a></button>
            <button><a id="saveButton"  href="">Back to Main Menu</a></button>
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