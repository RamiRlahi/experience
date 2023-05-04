function validateFormAbonnement() {
    let ref = document.getElementById("ref").value; 
    let titre = document.getElementsByName("titre")[0].value;
    let description = document.getElementsByName("description")[0].value;
    let prix = document.getElementsByName("prix")[0].value;

  
    let refError = document.getElementById("ref_error");
    let titreError = document.getElementById("titre_error");
    let descriptionError = document.getElementById("description_error");
    let prixError = document.getElementById("prix_error");
  
    let refRegex = /^[0-9]+$/;
    let titreRegex = /^[a-zA-Z\s]+$/;
    let descriptionRegex = /^[a-zA-Z\s]+$/;
    let prixRegex = /^[0-9]+$/;
  
    refError.innerHTML = "";
    titreError.innerHTML = "";
    descriptionError.innerHTML = "";
    prixError.innerHTML = "";
  
    let isValid = true;
  
    if (!refRegex.test(ref)) {
      refError.innerHTML = "Please enter a valid ref.";
      nameError.style.color = "red";
      isValid = false;
    }
  
    if (!titreRegex.test(titre)) {
      titreError.innerHTML = "Please enter a valid titre.";
      numberError.style.color = "red";
      isValid = false;
    } 
  
    if (!descriptionRegex.test(description)) {
      descriptionError.innerHTML = "Please enter a valid description.";
      emailError.style.color = "red";
      isValid = false;
    }
  
    if (!prixRegex.test(prix)) {
      prixError.innerHTML = "Please enter a valid price.";
      streetError.style.color = "red";
      isValid = false;
    }
  
   
  
    return isValid;
  }