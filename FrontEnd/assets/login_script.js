function submitForm(event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // console.log(email);
  // console.log(password);
  let formData = { email: email, password: password };
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      if (response.status === 200) {
        const utilisateur = { email: "sophie.bluel@test.tld" };
        const secretKey = "S0phie";
        const token = jsonwebtoken.sign(utilisateur, secretKey);
        document.cookie = `jeton=${token}; secure; path=/`;
        localStorage.setItem("jeton", token);
        console.log(token);

        window.location.href = "index.html";
        // contentLoggedIn.style.display = "block"; // Afficher le contenu pour les utilisateurs connectés
        // contentLoggedOut.style.display = "none"; // Masquer le contenu pour les visiteurs non connectés
      } else {
        const unvalid = "Nom d'utilisateur et/ou mot de passe non valide";
        alert(unvalid);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
