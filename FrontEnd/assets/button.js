// // function button_filter() {
// //   fetch("http://localhost:5678/api/categories")
// //     .then((response) => response.json())
// //     .then((data) => {
// //       const data_response = data;
// //       const portfolio = document.getElementById("button_section");
// //       data_response.forEach((element) => {
// //         var categories = document.createElement("button");
// //         categories.title = element.name;
// //         categories.textContent = element.name;

// //         categories.addEventListener("click", function () {
// //           console.log(data, element.categories);
// //         });

// //         portfolio.appendChild(categories);
// //       });
// //     });
// // }
// button_filter();

export function button_filter() {
  const categoriesElement = document.querySelectorAll(".bouton catégories");

  for (let i = 0; i < categoriesElement.length; i++) {
    categoriesElement[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      const response = await fetch(
        "http://localhost:5678/api/categories" + id + "/name"
      );
      const name = await response.json();
      const categoriesElement = event.target.parentElement;

      categoriesElement.appendChild(name);
    });
  }
}
