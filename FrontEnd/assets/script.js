function afficher_object() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      // Traiter les données JSON
      //définir les éléments qu'on va utiliser présents dans l'api
      const data_response = data;
      data_response.forEach((element) => {
        //faire appel à la div gallery afin d'afficher les informations dans data_response
        document.getElementById("gallery").innerHTML = element.title;
      });
    })
    .catch((error) => console.error(error));
}
afficher_object();
