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
      accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = "index.html";
        return response.json();
      } else {
        const unvalid = "Nom d'utilisateur et/ou mot de passe non valide";
        alert(unvalid);
      }
    })

    .then((data) => {
      document.cookie = `autLogin=${JSON.stringify(
        data
      )}; max-age=3600; secure; path=/`;
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
