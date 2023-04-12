function afficher_object() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
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
        })
        //afficher error si la recherche dans l'api n'aboutie pas
        .catch((error) => console.error(error));
    });
}
afficher_object();
