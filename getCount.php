<?php

$file = fopen("visitorcount.dll","r");
$count = fgets($file);
fclose($file);

echo $count;
?>