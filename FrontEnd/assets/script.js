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
const btnFilters = document.querySelectorAll(".btn-filter");

btnFilters.forEach((button) => {
  button.addEventListener("click", () => {
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    afficher_object(button.name);
  });
});
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
function isLogged() {
  let log = document.cookie;
  console.log(log);
  utilisateurConnecte = false;
  if (log.length > 1) {
    console.log("existe");
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

function pop(category_name) {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      let data_response = data;
      if (category_name != undefined && category_name != "Tous") {
        let data_response2 = data_response.filter((element) => {
          return element.category.name === category_name;
        });
        data_response = data_response2;
      }

      const content_pop_up = document.getElementById("gallery-in-pop-up");
      data_response.forEach((element) => {
        var img = document.createElement("img");
        var legend_div = document.createElement("div");
        var legend = document.createElement("p");
        legend.textContent = "éditer";
        legend.classList.add("legend_picture");
        img.src = element.imageUrl;
        img.classList.add("modal-img");
        content_pop_up.appendChild(img);
        img.insertAdjacentElement("afterend", legend);
        legend_div.appendChild(img);
        legend_div.appendChild(legend);
        content_pop_up.appendChild(legend_div);
      });
    });
}
pop();

var selectedFile = null;

function open_modale() {
  var modal = document.getElementById("gallerymodal");
  var firstmodal = document.getElementById("edit-gallery");
  var secondmodal = document.getElementById("add-pict");
  document
    .getElementById("openModalBtn")
    .addEventListener("click", function () {
      modal.style.display = "block";
      firstmodal.style.display = "block";
    });
  var cross_buttons = document.querySelectorAll(".close");
  cross_buttons.forEach(function (cross_button) {
    cross_button.addEventListener("click", function () {
      firstmodal.style.display = "none";
      secondmodal.style.display = "none";
      modal.style.display = "none";
    });
  });
  document.getElementById("addImgBtn").addEventListener("click", function () {
    firstmodal.style.display = "none";
    secondmodal.style.display = "block";
  });
  backToFirstModal.addEventListener("click", function () {
    secondmodal.style.display = "none";
    firstmodal.style.display = "block";
  });
  var imageInput = document.getElementById("imageInput");
  var selectedImg = document.getElementById("selectedImg");
  var imageadd = document.getElementById("imageadd");

  imageInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      selectedImg.src = e.target.result;
      imageadd.style.backgroundImage = "url('" + e.target.result + "')";
      imageadd.style.display = "block";
    };
  });

  var imageinput = document.getElementById("imageInput");
  var selectedImg = document.getElementById("selectedImg");

  document.getElementById("imageInput").addEventListener("click", function () {
    imageInput.style.display = "none";
    selectedImg.style.display = "flex";
  });

  var imageInput = document.getElementById("imageInput");
  var selectedImg = document.getElementById("selectedImg");
  var checkBtn = document.getElementById("checkbtn");
  var portfolio = document.getElementById("portfolio");

  checkBtn.addEventListener("click", function () {
    if (selectedImg.src) {
      var newImage = document.createElement("img");
      newImage.src = selectedImg.src;
      portfolio.appendChild(newImage);
      selectedImg.src = "";
      imageInput.value = "";
    }
  });

  imageInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      if (selectedImg.src !== e.target.result) {
        selectedImg.src = e.target.result;
      }
    };

    reader.readAsDataURL(file);
  });
}

function afficher_categories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      var select = document.getElementById("categorySelect");

      data.forEach(function (category) {
        var option = document.createElement("option");
        option.text = category.name;
        select.add(option);
      });
    });
}
afficher_categories();
var imageInput = document.getElementById("imageInput");

var imageInput = document.getElementById("imageInput");

imageInput.addEventListener("change", function (event) {
  var file = event.target.files[0];

  if (file) {
    var imageURL = URL.createObjectURL(file);

    var imagePreview = document.createElement("img");
    imagePreview.src = imageURL;

    var imagePreviewContainer = document.getElementById("image");
    imagePreviewContainer.innerHTML = "";
    imagePreviewContainer.appendChild(imagePreview);
  }
});
