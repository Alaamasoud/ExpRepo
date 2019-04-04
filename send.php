<?php

// Set the e-mail address that submission should be sent to.
$address = 'alaamasoude@gmail.com';

// Set the e-mail subject prefix.
$prefix = 'Contact Form';

// DO NOT EDIT ANYTHING BELOW UNLESS YOU KNOW WHAT YOU ARE DOING.

$error = false;
$success = false;

// Check that the submission address is valid.
if ((bool) filter_var(trim($address), FILTER_VALIDATE_EMAIL)) {
  // Also set sender/return path header to this address to avoid SPF errors.
  $to = $sender = trim($address);
}
else {
  $error = true;
}

// Check that referer is local server.
if (!isset($_SERVER['HTTP_REFERER']) || (parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) != $_SERVER['SERVER_NAME'])) {
  exit('Direct access not permitted');
}

// Check that this is a post request.
if ($_SERVER['REQUEST_METHOD'] != 'POST' || empty($_POST)) {
  $error = true;
}

// Check if fake url field is filled in, i.e. spam bot.
if (!empty($_POST['url'])) {
  $error = true;
}

// Check that e-mail address is valid.
if ((bool) filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL)) {
  $email = trim($_POST['email']);
}
else {
  $error = true;
}

if (!$error) {
  // Construct the mail with headers.
  $name = _contact_clean_str($_POST['name'], ENT_QUOTES, true, true);
  $prefix = _contact_clean_str($prefix, ENT_NOQUOTES, true, true);
//  $subject = _contact_clean_str($_POST['subject'], ENT_NOQUOTES, true, true);
//  $actual_link = "http://$_SERVER[HTTP_HOST]";
//  $logo = "<img src='$actual_link/images/basic/logo.jpg>' width='300' height='60' />";
  $subject = "[$prefix]";
  $message = _contact_clean_str($_POST['message'], ENT_NOQUOTES);
  $number = _contact_clean_str($_POST['number'], ENT_NOQUOTES);
  $formcontent=

   " From: $name
  \n Phone number: $number
  \n Email: $email
  \n Message: $message";
  $headers = [
    'From'                      => "$name <$email>",
    'Sender'                    => $sender,
    'Return-Path'               => $sender,
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8; format=flowed; delsp=yes',
    'Content-Transfer-Encoding' => '8Bit',
    'X-Mailer'                  => 'Hugo - Zen',
  ];
  $mime_headers = [];
  foreach ($headers as $key => $value) {
    $mime_headers[] = "$key: $value";
  }
  $mail_headers = join("\n", $mime_headers);

  // Send the mail, suppressing errors and setting Return-Path with the "-f" option.
  $success = @mail($to, $subject, $formcontent, $mail_headers, '-f' . $sender);
}

$status = $success ? 'submitted' : 'error';
$contact_form_url = strtok($_SERVER['HTTP_REFERER'], '?');

// Redirect back to contact form with status.
header('Location: ' . $contact_form_url . '?' . $status, TRUE, 302);
exit;

//function _contact_ff_wrap(&$line) {
//  $line = wordwrap($line, 72, " \n");
//}

function _contact_clean_str($str, $quotes, $strip = false, $encode = false) {
  if ($strip) {
    $str = strip_tags($str);
  }

  $str = htmlspecialchars(trim($str), $quotes, 'UTF-8');

  if ($encode && preg_match('/[^\x20-\x7E]/', $str)) {
    $str = '=?UTF-8?B?' . base64_encode($str) . '?=';
  }

  return $str;
}
