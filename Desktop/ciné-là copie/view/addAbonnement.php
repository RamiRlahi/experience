<?php

include '../Controller/abonnementC.php';
include '../model/AbonnementModel.php';

$error = "";

// create client
//$abonnementC = null;

// create an instance of the controller
$abonnement = new abonnementC();
if (
    isset($_POST["ref"])&&
    isset($_POST["titre"]) &&
    isset($_POST["description"]) &&
    isset($_POST["prix"])
) {
    if (
        !empty($_POST["ref"]) &&
        !empty($_POST["titre"]) &&
        !empty($_POST["description"]) &&
        !empty($_POST["prix"])
    ) {
        $abonnementModel = new AbonnementModel(
            $_POST['ref'],
            $_POST['titre'],
            $_POST['description'],
            $_POST['prix'],
            $_POST['image']
        );
        $abonnement->addAbonnement($abonnementModel);
        header('Location:ListAbonnement.php');
    } else
        $error = "Missing information";
}


?>


<html lang="en">

<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ciné-là Ajouter Abonnement</title>
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
                                <li class="nav-item active">
                                    <a class="nav-link" href="addAbonnement.php">Ajouter Abonnement</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link" href="addPromo.php">Ajouter Promotion</a>
                                </li>
                                <li class="nav-item ">
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
                            <h2 class="tm-block-title d-inline-block">Ajouter Abonnement</h2>
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
            <label for="titre" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Titre</label>
            <input type="text" id="titre" name="titre" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>
    
    <div class="input-group mb-3">
            <label for="description" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Description</label>
            <input type="text" id="description" name="description" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>

    <div class="input-group mb-3">
            <label for="prix" class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">Prix</label>
            <input type="int" id="prix" name="prix" class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7">
    </div>




    <div class="tm-product-img-dummy mx-auto">
                                <i class="fas fa-5x fa-cloud-upload-alt" onclick="document.getElementById('fileInput').click();"></i>
                            </div>
                            <div class="custom-file mt-3 mb-3">
                                <input id="fileInput" type="file" style="display:none;" />
                                <input type="button" class="btn btn-primary d-block mx-auto" value="Upload ..." onclick="document.getElementById('fileInput').click();"
                                />
                            </div>
        
<div class="input-group mb-3">
        <div class="ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0">
                <input type="submit" value="Ajouter" class="btn btn-primary">
        </div>
</div>

    </form>

</body>

</html>


