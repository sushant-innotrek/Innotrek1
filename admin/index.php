<!DOCTYPE html>
<html>
<head>
	<title>Admin</title>
	<link rel="stylesheet" type="text/css" href="css/style2.css">
</head>
<body>
	
	<div class="wrapper">
			<div class="Project">
				<center>
				<form method="POST" enctype="multipart/form-data">
					<input type="text" name="title" required placeholder="Name of Advertise">
					
					<input type="text" name="location" placeholder="Target Location">
					
					<input type="number" name="time" placeholder="Display Time">
					
					<input type="file" name="AdFile" required>

					<label for="ValidFrom"> Valid From</label>
					<input type="date" name="ValidFrom" required>

					<label for="ValidTo"> Valid To</label>
					<input type="date" name="ValidTo" required>

					<input type="Submit" name="Add" value="Add">
					
					<button onclick="window.location='UpdateAds.php'">View All</button>

				</form>	
				
				<div class="alertBox gone" id="ERROR">ERROR UPLOADING IMAGE</div></center>
			</div>	

	</div>


<script type="text/javascript" src="js/admin.js" ></script>


</body>
</html>



<?php

	if(isset($_POST['Add'])){
		$title = $_POST['title'];
		$location = $_POST['location'];
		$Ad_file = $_FILES['AdFile']['name'];
		$Ad_temp = $_FILES['AdFile']['tmp_name'];
		$Ad_type = $_FILES['AdFile']['type'];
		$time = $_POST['time'];
		$from = $_POST['ValidFrom'];
		$to = $_POST['ValidTo'];

		if(move_uploaded_file($Ad_temp, "Ads/".$Ad_temp)){
			$sql = "
			INSERT INTO Advertisements
			(Name, Location, Duration, ValidFrom, ValidTo, AdType, AdFile)
			VALUES
			('$title','$location',$time,'$from','$to','$Ad_type','$Ad_file')
			";

			
		}
		else{
			echo "
			<script>
				errorDetected();
			</script>";
		}
		echo $title;
		echo $location;
		echo $time;
		echo $from;
		echo $to;
		echo $Ad_file;
		echo $Ad_temp;
		echo $Ad_type;
	}
?>