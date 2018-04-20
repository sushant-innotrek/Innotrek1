<?php
	if(isset($_GET["Youtube"])&&isset($_GET["Lang"]))
	{
		$Youtube = $_GET["Youtube"];
		$Lang = $_GET["Lang"]; 

		$YID = shell_exec("java SubFetch.Collector ".$Youtube." ".$Lang);
		$YID = trim($YID);
		$file = fopen("Subtitles/".$Lang."_".$YID.".srt", "r");

		while($line = fgets($file)){
			echo $line."<br>"; 
		}
		fclose($file);
	}	
?>