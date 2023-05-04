<?php

include_once '../Controller/promoC.php';
include_once '../model/PromoModel.php';
include_once '../Controller/abonnementC.php';

$error = "";
$abonnementC = new abonnementC();
  $resultabonne = $abonnementC->listAbonnement();

// create client
//$abonnementC = null;

// create an instance of the controller
$promoC = new promoC();
if (
    isset($_POST["ref"])&&
    isset($_POST["ref_abonnement"])&&
    isset($_POST["pourcentage"]) &&
    isset($_POST["date_debut"]) &&
    isset($_POST["date_fin"])
) {
    if (
        !empty($_POST["ref"]) &&
        !empty($_POST["ref_abonnement"]) &&
        !empty($_POST["pourcentage"]) &&
        !empty($_POST["date_debut"]) &&
        !empty($_POST["date_fin"])
    ) {
        echo '<script>alert("hi")</script>';
        $promoModel = new PromoModel(
            $_POST['ref'],
            $_POST['ref_abonnement'],
            $_POST['pourcentage'],
            $_POST['date_debut'],
            $_POST['date_fin']
        );
        $promoC->addPromo($promoModel);
        header('Location:ListPromo.php');
    } else
        $error = "Missing information";
}


?>


<html lang="en">

<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ciné-là Ajouter Promo</title>
    <!--

    Template 2108 Dashboard

	http://www.tooplate.com/view/2108-dashboard

    -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600">
    <!-- https://fonts.google.com/specimen/Open+Sans -->
    <link rel="stylesheet" href="css/fontawesome.min.css">
    <!-- https://fontawesome.com/ -->
    <link rel="stylesheet" href="jquery-ui-datepicker/jquery-ui.min.css" type="text/css" />
    <!-- http://api.jqueryui.com/datepicker/ -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- https://getbootstrap.com/ -->
    <link rel="stylesheet" href="css/tooplate.css">
</head>

<body id="reportsPage" class="bg02">


<div class="" id="home">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="navbar navbar-expand-xl navbar-light bg-light">
                        <a class="navbar-brand" href="index.html">
                            <i class="fas fa-3x fa-tachometer-alt tm-site-icon"></i>
                            <h1 class="tm-site-title mb-0">ciné-là</h1>
                        </a>
                        <button class="navbar-toggler ml-auto mr-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mx-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="ListAbonnement.php">Abonnements
                                        <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                
                                <li class="nav-item">
                                    <a class="nav-link" href="ListPromo.php">Promotions</a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="addAbonnement.php">Ajouter Abonnement</a>
                                </li>

                                <li class="nav-item active">
                                    <a class="nav-link" href="addPromo.php">Ajouter Promotion</a>
                                </li>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="stat.php">Statistiques</a>
                                </li>
                            </ul>
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link d-flex" href="../Front/index_internaute.html">
                                        <i class="far fa-user mr-2 tm-logout-icon"></i>
                                        <a href="../Front/deconnexion.php"></a>Log out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            <div class="row tm-mt-big">
            <div class="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                <div class="bg-white tm-block">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="tm-block-title d-inline-block">Ajouter Promotion</h2>
                            <FONT color="red"><h5><?php if(isset($_GET["message_ajout"])){ echo $_GET["message_ajout"];  }  ?></h5></FONT>
                        </div>

    <div ref="error">
        <?php echo $error; ?>
    </div>

    <form action="" method="POST">

    <div class="input-group mb-3">
            <label for="ref" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Réference</label>
            <input type="int" id="ref" name="ref" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>







    <div class="input-group mb-3">
            <label for="ref_abonnement" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Réference Abonnement</label>
            <select type="text" id="ref_abonnement" name="ref_abonnement" class="custom-select col-xl-9 col-lg-8 col-md-8 col-sm-7">
            <?php foreach ($resultabonne as $rowD) { ?>
              <option  style="color:black" value=<?php echo $rowD['ref'];?>><?php echo $rowD['ref']; ?></option> 
              <?php }?>
                                    </select>
    </div>
    
    <div class="input-group mb-3">
            <label for="pourcentage" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Pourcentage</label>
            <input type="int" id="pourcentage" name="pourcentage" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>

    <div class="input-group mb-3">
            <label for="date_debut" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Date Début</label>
            <input type="Datetime" id="date_debut" name="date_debut" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>

    <div class="input-group mb-3">
            <label for="date_fin" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Date Fin</label>
            <input type="Datetime" id="date_fin" name="date_fin" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>

    <div class="input-group mb-3">
        <div class="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0">
                <input type="submit" value="Ajouter" class="btn btn-primary">
        </div>


       
    </form>
</body>

</html>