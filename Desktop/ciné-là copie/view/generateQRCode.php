<?php

require_once __DIR__ . '/vendor/autoload.php';

use Endroid\QrCode\QrCode;

if (isset($_GET['ref'])) {
    $ref = $_GET['ref'];
    $qrCode = generateQRCode($ref);
    header('Content-Type: image/png');
    echo $qrCode;
}

function generateQRCode($int)
{
    $qrCode = new QrCode((string)$int);
    $qrCode->setSize(256);
    return $qrCode->writeString();
}

?>

