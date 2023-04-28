<?php
include '../Controller/promoC.php';
$promoC = new promoC();
$promoC->deletePromo($_GET["ref"]);
header('Location:ListPromo.php');
?>