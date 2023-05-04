<?php
require_once('C:\xampp\htdocs\ciné-là\phpqrcode\phpqrcode.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $ref = isset($_POST['ref']) ? $_POST['ref'] : '';

  $content = "ref: ".$ref."\n";

  QRcode::png($content, "qrcode.png", QR_ECLEVEL_L, 10);
}
?>
