<?php
    include_once '../config.php';

    class promoC
    {
        public function listPromo() {
            $sql = "SELECT p.ref, p.ref_abonnement, p.pourcentage, p.date_debut, p.date_fin 
                    FROM promo p 
                    JOIN abonnement a ON p.ref_abonnement = a.ref";
            $db = config::getConnexion();
            try {
                $liste = $db->query($sql);
                return $liste;
            } catch (Exception $e) {
                die('Error:' . $e->getMessage());
            }
        }
        

        function deletePromo($ref)
    {
        $sql = "DELETE FROM promo WHERE ref = :ref";
        $db = config::getConnexion();
        $req = $db->prepare($sql);
        $req->bindValue(':ref', $ref);

        try {
            $req->execute();
        } catch (Exception $e) {
            die('Error:' . $e->getMessage());
        }
    }
function addPromo($promo)
{
    // check if the abonnement ref exists
    $abonnement_ref = $promo->getref_abonnement();
    $sql_check_ref = "SELECT ref FROM abonnement WHERE ref = :ref_abonnement";
    $db = config::getConnexion();
    try {
        $query_check_ref = $db->prepare($sql_check_ref);
        $query_check_ref->execute([
            'ref_abonnement' => $abonnement_ref
        ]);
        $result_check_ref = $query_check_ref->fetch();
        if (!$result_check_ref) {
            echo "Error: The abonnement ref_abonnement does not exist";
            return;
        }
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
        return;
    }

    // check if the promo ref already exists
    $promo_ref = $promo->getref();
    $sql_check_promo_ref = "SELECT ref FROM promo WHERE ref = :ref";
    try {
        $query_check_promo_ref = $db->prepare($sql_check_promo_ref);
        $query_check_promo_ref->execute([
            'ref' => $promo_ref
        ]);
        $result_check_promo_ref = $query_check_promo_ref->fetch();
        if ($result_check_promo_ref) {
            echo "Error: The promo ref already exists";
            return;
        }
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
        return;
    }

    // If the ref exists and the promo does not, insert the new promo
    $sql = "INSERT INTO promo (ref, ref_abonnement, pourcentage, date_debut, date_fin)  
            VALUES (:ref, :ref_abonnement, :pourcentage, :date_debut, :date_fin)";
    try {
        $query = $db->prepare($sql);
        $query->execute([
            'ref'=> $promo->getref(),
            'ref_abonnement' => $promo->getref_abonnement(),
            'pourcentage' => $promo->getpourcentage(),
            'date_debut' => $promo->getdate_debut()->format('Y-m-d H:i:s'),
            'date_fin' => $promo->getdate_fin()->format('Y-m-d H:i:s')
        ]);
        echo "Promo added successfully";
    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

    


function updatePromo($promo, $ref)
{
    try {
        $db = config::getConnexion();
        $query = $db->prepare(
            'UPDATE promo SET 
                ref_abonnement = :ref_abonnement,
                pourcentage = :pourcentage, 
                date_debut = :date_debut, 
                date_fin = :date_fin
            WHERE ref = :ref'
        );
        $query->execute([
            'ref' => $ref,
            'ref_abonnement' => $promo->getref_abonnement(),
            'pourcentage' => $promo->getpourcentage(),
            'date_debut' => $promo->getdate_debut()->format('Y-m-d H:i:s'),
            'date_fin' => $promo->getdate_fin()->format('Y-m-d H:i:s')
        ]);
        echo $query->rowCount() . " records UPDATED successfully <br>";
    } catch (PDOException $e) {
        $e->getMessage();
    }
}


    function showPromo($ref)
{
    $sql = "SELECT promo.ref, promo.pourcentage, promo.date_debut, promo.date_fin 
            FROM promo 
            JOIN abonnement ON promo.ref_abonnement = abonnement.ref_abonnement 
            WHERE promo.ref = :ref";
    $db = config::getConnexion();
    try {
        $query = $db->prepare($sql);
        $query->execute([
            'ref' => $ref
        ]);

        $promo = $query->fetch();
        return $promo;
    } catch (Exception $e) {
        die('Error: ' . $e->getMessage());
    }
}




    }