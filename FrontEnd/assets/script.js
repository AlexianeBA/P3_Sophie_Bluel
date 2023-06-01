//création de la fonction pour afficher les objects en faisant appel à une API
function afficher_object(category_name) {
  //requet api avec fonction fetch
  fetch("http://localhost:5678/api/works")
    //recherche reponse dans le fichier json
    .then((response) => response.json())
    // si pas de réponse dans JSON alors on va chercher dans l'api
    .then((data) => {
      // Traiter les données JSON
      //définir les éléments qu'on va utiliser présents dans l'api
      let data_response = data;
      if (category_name != undefined && category_name != "Tous") {
        let data_response2 = data_response.filter((element) => {
          return element.category.name === category_name;
        });
        data_response = data_response2;
      }

      const gallery = document.getElementById("gallery");
      data_response
        // pour chaque éléments on donne le chemin vers html
        .forEach((element) => {
          //on créé le parent figure
          var figure = document.createElement("figure");
          // on créé l'enfant de figure : img
          var img = document.createElement("img");
          // on attribut à img sa source
          img.src = element.imageUrl;
          // on attribut à img son titre
          img.title = element.title;
          // on créé l'enfant de figure : figcaption
          var figcaption = document.createElement("figcaption");
          figcaption.textContent = element.title;
          //on attribu à figure son enfant img
          figure.appendChild(img);
          // on attribut à figure son enfant figcaption
          figure.appendChild(figcaption);
          // on attribut à gallery son enfant figure
          gallery.appendChild(figure);
        });
      //afficher error si la recherche dans l'api n'aboutie pas
      // .catch((error) => console.error(error));
    });
}
afficher_object();

function filter() {
  const btnFilters = document.querySelectorAll(".btn-filter");

  btnFilters.forEach((button) => {
    button.addEventListener("click", () => {
      var gallery = document.getElementById("gallery");
      gallery.innerHTML = "";
      afficher_object(button.name);
    });
  });
}
filter();
function form_contact() {
  const form = document.getElementById("contact");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name !== "" && email !== "" && message !== "") {
      const pop = "Envoyé avec succès!";
      alert(pop);
      document.getElementById("contact").reset();
    } else {
      alert("Veuillez remplir tous les champs du formulaire.");
    }
  });
}
form_contact();
function isLogged() {
  let log = document.cookie;
  utilisateurConnecte = false;
  if (log.length > 1) {
    utilisateurConnecte = true;
  }
  contentLog(utilisateurConnecte);
}
isLogged();

function contentLog(utilisateurConnecte) {
  var is_connected_edition_mode = document.getElementById(
    "is_connected_edition_mode"
  );
  var is_connected_login_link = document.getElementById(
    "is_connected_login_link"
  );
  var is_not_connected_login_link = document.getElementById(
    "is_not_connected_login_link"
  );
  var connected_modif = document.getElementById("connected_modif");

  if (utilisateurConnecte) {
    is_connected_edition_mode.style.display = "flex";
    is_connected_login_link.style.display = "block";
    is_not_connected_login_link.style.display = "none";
    connected_modif.style.display = "flex";
  } else {
    is_connected_edition_mode.style.display = "none";
    is_connected_login_link.style.display = "none";
    is_not_connected_login_link.style.display = "block";
    connected_modif.style.display = "none";
  }
}

var logoutButton = document.querySelector("logout");

function log_out() {
  document.cookie = "autLogin=test; max-age=0; secure; path=/";
  window.location.href = "index.html";
}
