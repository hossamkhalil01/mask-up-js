<?php 

require_once '../includes/functions.php';
$username = $_SESSION['username'];
// Get image data from database
$query = "SELECT * FROM `player` WHERE `username` = '$username'"; 
$select_img_query = query($query);

?>

<?php if(mysqli_num_rows($select_img_query) > 0){ ?> 
    <div class="gallery"> 
        <?php while($row = mysqli_fetch_assoc($select_img_query)){ ?> 
            <img src="data:image/jpg;charset=utf8;base64,<?php echo base64_encode($row['avatar']); ?>" /> 
        <?php } ?> 
    </div> 
<?php }else{ ?> 
    <p class="status error">Image not found...</p> 
<?php } ?>