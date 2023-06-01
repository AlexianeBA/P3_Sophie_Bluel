function modal() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      let data_response = data;

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
modal();

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
}

function display_categories() {
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
display_categories();

function display_picture_add() {
  var imageInput = document.getElementById("imageInput");
  var checkButton = document.getElementById("checkbtn");

  imageInput.addEventListener("change", function (event) {
    var file = event.target.files[0];

    if (file) {
      var imageURL = URL.createObjectURL(file);

      var imagePreview = document.createElement("img");
      imagePreview.src = imageURL;

      var imagePreviewContainer = document.getElementById("image");
      imagePreviewContainer.innerHTML = "";
      imagePreviewContainer.appendChild(imagePreview);

      checkButton.classList.add("image-added");
    } else {
      checkButton.classList.remove("image-added");
    }
    hideElements();
  });
}
display_picture_add();

function preview_picture() {
  var imageInput = document.getElementById("imageInput");

  imageInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      if (selectedImg.src !== e.target.result) {
        selectedImg.src = e.target.result;
        hideElements();
      }
    };

    reader.readAsDataURL(file);
  });
}

function hideElements() {
  var icon = document.getElementById("icon");
  var btnUploadPicture = document.getElementById("btn_upload_picture");
  var limitSizeUploadPicture = document.getElementById(
    "limit_size_upload_picture"
  );

  if (icon) {
    icon.style.display = "none";
  }
  if (btnUploadPicture) {
    btnUploadPicture.style.display = "none";
  }
  if (limitSizeUploadPicture) {
    limitSizeUploadPicture.style.display = "none";
  }
}

display_picture_add();
preview_picture();

function check_btn() {
  var btn_validate_add_picture = document.getElementById("checkntn");
}
