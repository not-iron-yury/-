<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$page = $data['page'];
$product = $data['product'];
$tel = $data['tel'];
$model = $data['model'];
$price = $data['price'];

// Контент письма
$title = 'Заявка с сайта'; // Название письма
$body = '<p>Страница: <strong>'.$page.'</strong></p>'.
$body = '<p>Конструкция: <strong>'.$product.'</strong></p>'.
        '<p>Телефон: <a href="tel:'.$tel.'">'.$tel.'</a> <p>'.
        '<p>Модель: <strong>'.$model.'</strong></p>'.
        '<p>Цена на сайте: <strong>'.$price.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'user.name@inbox.ru'; // Логин на почте (по факту сама почта)
  $mail->Password   = 'MQHKPJk57JdGK5dqDxjH'; // Пароль для внешних приложений
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('user.name@inbox.ru', 'Заявка с сайта'); // Адрес почты и имя отправителя

  // Получатель письма
  $mail->addAddress('user.name@inbox.ru.com');

  // Отправка сообщения
  if ($tel != '') {
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send('d');
    
    // Сообщение об успешной отправке
    echo ('Сообщение отправлено успешно!');
  }



} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
}
