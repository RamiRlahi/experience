<?php
include '../Controller/abonnementC.php';
$abonnementC = new abonnementC();
$abonnementC->deleteAbonnement($_GET["ref"]);
header('Location:ListAbonnement.php');
?>