//création de la fonction pour afficher les objects en faisant appel à une API
function afficher_object() {
  //requet api avec fonction fetch
  fetch("http://localhost:5678/api/works")
    //recherche reponse dans le fichier json
    .then((response) => response.json())
    // si pas de réponse dans JSON alors on va chercher dans l'api
    .then((data) => {
      // Traiter les données JSON
      //définir les éléments qu'on va utiliser présents dans l'api
      const data_response = data;

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

// function button_filter() {
//   fetch("http://localhost:5678/api/categories")
//     .then((response) => response.json())
//     .then((data) => {
//       const data_response = data;
//       const portfolio = document.getElementById("button_section");
//       data_response.forEach((element) => {
//         var categories_button = document.createElement("button");

//         categories_button.textContent = element.name;
//         categories_button.name = element.name;
//         categories_button.className = "btn-filter";

//         portfolio.appendChild(categories_button);
//       });
//     });
// }
// button_filter();

const btnFilters = document.querySelectorAll(".btn-filter");
console.log(btnFilters); // affiche une NodeList des boutons avec la classe 'btn-filter'

btnFilters.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.name);
  });
});
