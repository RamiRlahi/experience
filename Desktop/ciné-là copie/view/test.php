<?php
require_once 'vendor/autoload.php';

use BaconQrCode\Writer;

if (class_exists('BaconQrCode\Writer')) {
    echo 'BaconQrCode library is installed!';
} else {
    echo 'BaconQrCode library is not installed!';
}
