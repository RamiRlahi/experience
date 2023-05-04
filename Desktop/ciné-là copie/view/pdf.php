<?php
 include_once '../config.php';
$db = config::getConnexion();
$stmt = $db->prepare("SELECT ref, titre, description, prix, image FROM abonnement ");
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Create a new PDF document
require_once('C:\xampp\htdocs\ciné-là\fpdf185\fpdf.php');
$pdf = new FPDF();
$pdf->AddPage();

// Set up the table
$header = array('ref', 'titre', 'description', 'prix', 'image');
$pdf->SetFont('Arial', 'B', 12);
foreach($header as $col){
    $pdf->Cell(37, 7, $col, 1);
}

$pdf->Ln();

// Add the data to the table
$pdf->SetFont('Arial', '', 8);
foreach($data as $row){
    foreach($row as $col){
        $pdf->Cell(37, 7, $col, 1);
    }
    $pdf->Ln();
}

// Output the PDF
$pdf->Output();
?>