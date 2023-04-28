var form=document.getElementById("form_inscrip_back");
form.addEventListener("submit",verif_inscrip_back);

function verif_inscrip_back(e)
{

    //Déclaration des variables pour les champs du formulaire
    var type=document.getElementById("type_form_back").value;
    var nom=document.getElementById("nom_form_back").value;
    var prenom=document.getElementById("prenom_form_back").value;
    var nom_utilisateur=document.getElementById("NomUtilisateur_form_back").value;
    var email=document.getElementById("email_form_back").value;
    var mdp_1=document.getElementById("mdp1_form_back").value;
    var mdp_2=document.getElementById("mdp2_form_back").value;
    var num_tel=document.getElementById("tel_form_back").value;


    //Déclaration des varaibles pour les controles d'erreurs
    var erreur_type=document.getElementById("erreur_type_back");
    var erreur_nom=document.getElementById("erreur_nom_back");
    var erreur_prenom=document.getElementById("erreur_prenom_back");
    var erreur_nomUtilisateur=document.getElementById("erreur_nomUtilisateur_back");
    var erreur_email=document.getElementById("erreur_email_back");
    var erreur_mdp_1=document.getElementById("erreur_mdp1_back");
    var erreur_mdp_2=document.getElementById("erreur_mdp2_back");
    var erreur_tel=document.getElementById("erreur_tel_back");

    //Controles de saisies sur le type
    if(type=="select")
    {
        e.preventDefault();
        erreur_type.innerText="Veuillez saisir un type";
    }
    else
    {
        erreur_type.innerText="";
    }

    //Controles de saisies sur le nom
    if(nom=="")
    {
        e.preventDefault();
        erreur_nom.innerText="Veuillez saisir un nom";
    }
    else if(!nom.match(/[A-Z]/))
    {
        e.preventDefault();
        erreur_nom.innerText="Le nom doit contenir une majuscule";
    }
    else if(!nom.match(/[a-z]/))
    {
        e.preventDefault();
        erreur_nom.innerText="Le nom doit contenir une minuscule";
    }
    else if(nom.match(/[0-9]/))
    {
        e.preventDefault();
        erreur_nom.innerText="Le nom ne doit pas contenir de chiffres";
    }
    else
    {
        erreur_nom.innerText="";
    }

    //Controles de saisies sur le prénom
    if(prenom=="")
    {
        e.preventDefault();
        erreur_prenom.innerText="Veuillez saisir un prénom";
    }
    else if(!prenom.match(/[A-Z]/))
    {
        e.preventDefault();
        erreur_prenom.innerText="Le prénom doit contenir une majuscule";
    }
    else if(!prenom.match(/[a-z]/))
    {
        e.preventDefault();
        erreur_prenom.innerText="Le prénom doit contenir une minuscule";
    }
    else if(prenom.match(/[0-9]/))
    {
        e.preventDefault();
        erreur_prenom.innerText="Le prénom ne doit pas contenir de chiffres";
    }
    else
    {
        erreur_prenom.innerText="";
    }

    //Controles de saisies sur le nom d'utilisateur
    if(nom_utilisateur=="")
    {
        e.preventDefault();
        erreur_nomUtilisateur.innerText="Veuillez saisir un nom d'utlisateur";
    }
    else if(!nom_utilisateur.match(/[A-Z]/))
    {
        e.preventDefault();
        erreur_nomUtilisateur.innerText="Le nom d'utilisateur doit contenir une majuscule";
    }
    else if(!nom_utilisateur.match(/[a-z]/))
    {
        e.preventDefault();
        erreur_nomUtilisateur.innerText="Le nom d'utlisateur doit contenir une minuscule";
    }
    else if(!nom_utilisateur.match(/[0-9]/))
    {
        e.preventDefault();
        erreur_nomUtilisateur.innerText="Le nom d'utlisateur doit contenir de chiffres";
    }
    else
    {
        erreur_nomUtilisateur.innerText="";
    }
    //Controles de saisies sur l'adresse email
    if(email=="")
    {
        e.preventDefault();
        erreur_email.innerText="Veuillez saisir une adresse E-mail";
    }
    else if(email.indexOf("@")=="-1")
    {
        e.preventDefault();
        erreur_email.innerText="Veuillez saisir une adresse E-mail valide";
    }
    else
    {
        erreur_email.innerText="";
    }

    //Controles de saisie sur le mot de passe
    if(mdp_1=="")
    {
        e.preventDefault();
        erreur_mdp_1.innerText="Veuillez saisir un mot de passe";
    }
    else if(mdp_1.length<8)
    {
        e.preventDefault();
        erreur_mdp_1.innerText="Le mot de passe doit contenir au moins 8 caractères";
    }
    else if(!mdp_1.match(/[A-Z]/))
    {
        e.preventDefault();
        erreur_mdp_1.innerText="Le mot de passe doit contenir au moins une lettre majuscule";
    }
    else if(!mdp_1.match(/[a-z]/))
    {
        e.preventDefault();
        erreur_mdp_1.innerText="Le mot de passe doit contenir au moins une lettre minuscule";
    }
    else if(!mdp_1.match(/[0-9]/))
    {
        e.preventDefault();
        erreur_mdp_1.innerText="Le mot de passe doit contenir au moins un nombre";
    }
    else
    {
        erreur_mdp_1.innerText="";
    }
    //Comparaison des mots de passe
    if(mdp_2 != mdp_1)
    {
        e.preventDefault();
        erreur_mdp_2.innerText="Mots de passe différents , veuillez réessayer";
    }
    else{
        erreur_mdp_2.innerText="";
    }

    //Controles de saisies sur le numéro de téléphone
    if(num_tel=="")
    {
        e.preventDefault();
        erreur_tel.innerText="Veuillez saisir un numéro de téléphone";
    }
    else if(num_tel.length<8)
    {
        e.preventDefault();
        erreur_tel.innerText="Le numéro de téléphone saisi n'est pas valide";
    }
    else
    {
        erreur_tel.innerText="";
    }
}