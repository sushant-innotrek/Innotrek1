<?php

$ch = curl_init("http://127.0.0.1:5000/news?category=national");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch);
curl_close($ch);
echo $data;
?>