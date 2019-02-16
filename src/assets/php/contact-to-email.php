<?php

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$animal = $_POST['animal'];
$message = $_POST['message'];

$email_from = "info@allmankindisstupid.com";
$email_subject = "contact from: $visitor_email";
$email_body = "$name who likes $animal's has sent you the following message:\n".
                "$message\n".
$to = "allmankindisstupid@gmail.com";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

mail($to, $email_subject, $email_body, $headers);

?>