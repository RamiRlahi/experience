<?php

include '../Controller/promoC.php';
include '../model/PromoModel.php';

$error = "";

// create abonnement
$promo = null;

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
        $promo = new PromoModel(
            $_POST['ref'],
            $_POST['ref_abonnement'],
            $_POST['pourcentage'],
            $_POST['date_debut'],
            $_POST['date_fin']
        );
        $promoC->updatePromo($promo, $_POST["ref"]);
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
    <title>ciné-là Modifier Promotion</title>
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
</head>

<body>
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
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        Settings
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Profile</a>
                                        <a class="dropdown-item" href="#">Billing</a>
                                        <a class="dropdown-item" href="#">Customize</a>
                                    </div>
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
                            <h2 class="tm-block-title d-inline-block">Modifier Abonnement</h2>
                            <FONT color="red"><h5><?php if(isset($_GET["message_ajout"])){ echo $_GET["message_ajout"];  }  ?></h5></FONT>
                        </div>
    
    <hr>

    <div id="error">
        <?php echo $error; ?>
    </div>

    <?php
    if (isset($_POST['ref'])) {
        $promo = $promoC->showPromo($_POST['ref']);

    ?>

        <form action="" method="POST">
            <table border="1" align="center">
                <tr>
                    <td>
                        <label for="ref">ref:
                        </label>
                    </td>
                    <td><input type="text" name="ref" id="ref" value="<?php echo $promo['ref']; ?>" maxlength="20"></td>
                </tr>
                <tr>
                    <td>
                        <label for="ref_abonnement">ref_abonnement:
                        </label>
                    </td>
                    <td><input type="text" name="ref_abonnement" id="ref_abonnement" value="<?php echo $promo['ref_abonnement']; ?>" maxlength="20"></td>
                </tr>
                <tr>
                    <td>
                        <label for="pourcentage">pourcentage:
                        </label>
                    </td>
                    <td><input type="text" name="pourcentage" id="pourcentage" value="<?php echo $promo['pourcentage']; ?>" maxlength="20"></td>
                </tr>
                <tr>
                    <td>
                        <label for="date_debut">date_debut:
                        </label>
                    </td>
                    <td><input type="DateTime" name="date_debut" id="date_debut" value="<?php echo $promo['date_debut']; ?>" maxlength="20"></td>
                </tr>
                <tr>
                    <td>
                        <label for="date_fin">date_fin:
                        </label>
                    </td>
                    <td>
                        <input type="DateTime" name="date_fin" value="<?php echo $promo['date_fin']; ?>" id="date_fin">
                    </td>
                </tr>
                    <td></td>
                    <td>
                        <input type="submit" value="Update">
                    </td>
                    <td>
                        <input type="reset" value="Reset">
                    </td>
                </tr>
            </table>
        </form>
    <?php
    }
    ?>
</body>

</html>