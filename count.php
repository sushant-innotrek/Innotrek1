<?php
include "getCount.php";

$file = fopen("visitorcount.dll", "w");
++$count;
fwrite($file, $count);
fclose($file);

?>