<?php

include '../Controller/abonnementC.php';
$abonnementC = new abonnementC();
$list = $abonnementC->listabonnement();
?>
<html>

<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ciné-là List Abonnement</title>
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
                                <li class="nav-item active">
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

                                <li class="nav-item">
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
                            <h2 class="tm-block-title d-inline-block">List Abonnement</h2>
                            <FONT color="red"><h5><?php if(isset($_GET["message_ajout"])){ echo $_GET["message_ajout"];  }  ?></h5></FONT>
                        </div>

                        </div>


                        <form method="GET" action="rechercheAbonnement.php">
  <input class="form-control validate col-xl-9 col-lg-8 col-md-8 col-sm-7" type="text" name="search" placeholder="recherche par titre">
  <button  class= "btn btn-primary" type="submit">Search</button>
</form>


<a href="pdf.php"class="btn btn-primary">Télécharger en PDF</a>


    <table class="table table-hover table-striped tm-table-striped-even mt-3">
    <thead>
        <tr class="tm-bg-gray">
            <th scope="col">ref</th>
            <th scope="col">titre</th>
            <th scope="col">description</th>
            <th scope="col">prix</th>
            <th scope="col">image</th>
            <th scope="col">QR code</th>
            <th>Modifier</th>
            <th>addPromo</th>
            <th>Supprimer</th>
        </tr>
        <thead>
        <?php
        foreach ($list as $abonnement) {
        ?>
            <tr>
                <td><?= $abonnement['ref']; ?></td>
                <td><?= $abonnement['titre']; ?></td>
                <td><?= $abonnement['description']; ?></td>
                <td><?= $abonnement['prix']; ?></td>
                <td><?= $abonnement['image']; ?></td>

                <td>
    <img class="qr-code" id="qr-code-<?= $abonnement['ref'] ?>" src="testqrcode.php?ref=<?= $abonnement['ref'] ?>" alt="QR Code">
</td>

                
                <td align="center">

               


                    <form method="POST" action="updateAbonnement.php">
                        <input class= "btn btn-primary" type="submit" name="Modifier" value="Modifier">
                        <input type="hidden" value=<?PHP echo $abonnement['ref']; ?> name="ref">
                    </form>
                </td>
                <td>
                    <form method="POST" action="addPromo.php">
                         <input class="btn btn-primary" type="submit" name="addPromo" value="Ajouter Promo">
                         <input type="hidden" value="<?php echo $abonnement['ref']; ?>" name="ref">
                    </form>
                </td>

                
                <td>
                    <a class="fas fa-trash-alt tm-trash-icon" href="deleteAbonnement.php?ref=<?php echo $abonnement['ref']; ?>"></a>
                </td>

                
               
            </tr>

            



        <?php
        }
        ?>
    </table>
</body>

</html>