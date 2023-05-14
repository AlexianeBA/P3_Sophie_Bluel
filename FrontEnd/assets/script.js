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
