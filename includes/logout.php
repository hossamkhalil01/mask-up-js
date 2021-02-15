<?php ob_start(); ?>
<?php session_start(); ?>

<?php
$_SESSION['username'] = null;
$_SESSION['nickname'] = null;
$_SESSION['score'] = null;
$_SESSION['level'] = null;

header("Location: ../index.php");