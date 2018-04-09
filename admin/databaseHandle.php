<?php
	function InsertAd($Params){
	 	$conn = mysqli_connect("localhost","root","helloworld","YourWord");
	 	//////////// Creates Table if not Exist //////////
	 	$sql = "CREATE TABLE IF NOT EXISTS `YourWord`.`advertisements` ( `AdId` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(50) NOT NULL , `Location` VARCHAR(50) NOT NULL , `Duration` INT NOT NULL , `ValidFrom` DATE NOT NULL , `ValidTo` DATE NOT NULL , `AdFile` VARCHAR(50) NOT NULL , `AdType` VARCHAR(50) NOT NULL , `TimeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`AdId`)) ENGINE = InnoDB";
	 	mysqli_query($conn,$sql);
	 	/////////////////////////////////////////////////
	 
	 	//////////////////////////
	 	$sql = $Params;
	 	if(mysqli_query($conn,$sql)){
	 	}
	 	else{
	 		echo mysqli_error($conn);
	 	}
	 	/////////////////////////
	 	mysqli_close($conn);
	 }
?>	