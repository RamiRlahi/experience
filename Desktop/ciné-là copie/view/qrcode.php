<?php

require_once __DIR__ . '/vendor/autoload.php';

use Endroid\QrCode\QrCode;
use Endroid\QrCode\QrCodeGenerator;

if (isset($_GET['ref'])) {
    $ref = $_GET['ref'];
    $qrCode = generateQRCode($ref);
    header('Content-Type: image/png');
    echo $qrCode;
}

function generateQRCode($string)
{
    $qrCode = new QrCode($string);
    $qrCode->setSize(256);

    $qrCodeGenerator = new QrCodeGenerator(
        $qrCode,
        $qrCode->getForegroundColor(),
        $qrCode->getBackgroundColor()
    );

    return $qrCodeGenerator->writeString();
}

