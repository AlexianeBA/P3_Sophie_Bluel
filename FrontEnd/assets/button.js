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
