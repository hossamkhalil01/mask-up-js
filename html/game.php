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
<!--    width: 1900px;-->
<!--    height: 800px;-->
    <body>
    <form  id="form1" method="post" action= "../includes/updateProgress.php" style="display: none">
        <input type="text" name="newScore" id="score">
        <input type="text" name="newLevel" id="Level">
        <input type="submit" name="updateProgress" value="updateProgress">
    </form>
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