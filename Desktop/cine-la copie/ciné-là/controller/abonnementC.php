<?php
    include_once '../config.php';

    class abonnementC
    {
        public function listabonnement()
        {
            $sql = "SELECT * FROM abonnement";
            $db = config::getConnexion();
            try {
                $liste = $db->query($sql);
                return $liste;
            } catch (Exception $e) {
                die('Error:' . $e->getMessage());
            }
        }

        function deleteAbonnement($ref)
        {
            $sql = "DELETE FROM abonnement WHERE ref = :ref";
            $db = config::getConnexion();
            $req = $db->prepare($sql);
            $req->bindValue(':ref', $ref);
        
            // delete the promo with the same ref as the abonnement
            $promo_sql = "DELETE FROM promo WHERE ref = :ref_abonnement";
            $promo_req = $db->prepare($promo_sql);
            $promo_req->bindValue(':ref_abonnement', $ref);
        
            try {
                $db->beginTransaction();
                $req->execute();
                $promo_req->execute();
                $db->commit();
            } catch (Exception $e) {
                $db->rollback();
                die('Error:' . $e->getMessage());
            }
        }
        
        
    function addAbonnement($abonnement)
    {
        $sql = "INSERT INTO abonnement  
        VALUES (:ref , :titre ,:descr, :prix,:img)";
        $db = config::getConnexion();
        try {
            $query = $db->prepare($sql);
            $query->execute([
                'ref' => $abonnement->getref(),
                'titre' => $abonnement->gettitre(),
                'descr' => $abonnement->getdescription(),
                'prix' => $abonnement->getprix(),
                'img' => $abonnement->getimage()
            ]);
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }


/*
<script>
    const NoNumbersElements = document.getElementsByClassName("NoNumbers");
    
    for (let i = 0; i < NoNumbersElements.length; i++) {
      NoNumbersElements[i].addEventListener("keydown", (event) => {
        if (event.key.match(/[a-zA-Z]+/g)) {
          return event;
        } else {
          event.preventDefault();
        }
      });
    }
    
    const NumbersOnlyElements = document.getElementsByClassName("NumbersOnly");
    
    for (let i = 0; i < NumbersOnlyElements.length; i++) {
      NumbersOnlyElements[i].addEventListener("keydown", (event) => {
        // Allow only numbers and some special keys
        if (event.key.match(/[0-9]/) || event.key === "Backspace" || event.key === "Delete" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Tab" || (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'v' || event.key === 'a'))) {
          return event;
        } else {
          event.preventDefault();
        }
      });
    }
    
    
    document.getElementByClassName("order_name").disabled = true;
    
    
    
    function validateForm() {
      var a = document.forms["Form"]["name"].value;
      var b = document.forms["Form"]["number"].value;
      var c = document.forms["Form"]["email"].value;
      var d = document.forms["Form"]["flat"].value;
      if ((a == null || a == "") && (b == null || b == "") && (c == null || c == "") && (d == null || d == "")) {
        console.log("test");
        alert("Please Fill In All Required Fields");
        return false;
      }
    }
     </script>
*/



    function updateabonnement($abonnement, $ref)
    {
        try {
            $db = config::getConnexion();
            $query = $db->prepare(
                'UPDATE abonnement SET 
                    titre = :titre, 
                    description = :description, 
                    prix = :prix, 
                    image = :image
                WHERE ref= :ref'
            );
            $query->execute([
                'ref' => $ref,
                'titre' => $abonnement->gettitre(),
                'description' => $abonnement->getdescription(),
                'prix' => $abonnement->getprix(),
                'image' => $abonnement->getimage()
            ]);
            echo $query->rowCount() . " records UPDATED successfully <br>";
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }

    function showAbonnement($ref)
    {
        $sql = "SELECT * from abonnement where ref = $ref";
        $db = config::getConnexion();
        try {
            $query = $db->prepare($sql);
            $query->execute();

            $abonnement = $query->fetch();
            return $abonnement;
        } catch (Exception $e) {
            die('Error: ' . $e->getMessage());
        }
    }

    function rechercheAbonnement($titre)
{
    $sql = "SELECT * FROM abonnement WHERE titre=:titre";
    $db = config::getConnexion();
    try {
        $query = $db->prepare($sql);
        $query->bindValue(':titre', $titre);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    } catch (PDOException $e) {
        die('Error: ' . $e->getMessage());
    }
}




    }