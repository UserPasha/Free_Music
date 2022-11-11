<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer-master/src/PHPMailer.php";
require "PHPMailer-master/src/Exception.php";
require 'PHPMailer-master/src/SMTP.php';

// require __DIR__."/PHPMailer-master/src/Exception.php";
// require __DIR__."/PHPMailer-master/src/PHPMailer.php";

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";
$mail->isHTML(true)

$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$message = $_POST["message"];

$email_template = "template_mail.html";

$body = file_get_contents($email_template);

$body = str_replace('%name%', $name, $body);
$body = str_replace('%email%', $email, $body);
$body = str_replace('%phone%', $phone, $body);
$body = str_replace('%message%', $message, $body);

// $body = $name . ' ' . $email . ' ' . $phone . ' ' . $message;

$theme = "[Заявка с формы]";

$mail->addAddress('itdevreact@gmail.com');
$mail->Subject = $theme;
$mail->MsgHTML($body);

if(!$mail->send(){
    $message = "Сообщение не отправлено"
} else{
    $message = "Сообщение отправлено"
});

$response = ["message"=> $message];
header('Content-type: application/json')

echo json_encode($response);
?>


