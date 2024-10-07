// load category for buttons
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  showCategory(data.categories);
};

const showCategory = (data) => {
  const btnCategory = document.getElementById("category-button");
  data.forEach((element) => {
    const button = document.createElement("div");
    // console.log(element.category);
    button.innerHTML = `
    <button
            id="${element.id}"
             onclick=loadPetByCategory('${element.category.toLowerCase()}','${
      element.id
    }')
              class="btn btn-outline font-semibold text-lg px-14 col-span-1 hover:bg-[rgb(14,122,129)] hover:text-black" 
            >
              <div class="flex items-center gap-2">
              <img
                class="w-5 h-5"
                src="${element.category_icon}"
                alt=""
              />
              <p class="">${element.category}</p>
              </div>
            </button>
    `;
    btnCategory.appendChild(button);
  });
};

function sorting(id) {
  // console.log(id);
  id.sort((a, b) => b.price - a.price);
  // console.log(id);
}

// load pets

const loadPet = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  setTimeout(() => {
    showPets(data.pets);
  }, 2000);
  // showPets(data.pets);
};

const petscontainer = document.getElementById("show-pets");
const showPets = (data) => {
  // document.getElementById("btn-sort").addEventListener("click", function () {
  //   console.log("ok");
  //   loadPet(data);
  // });
  console.log(data);
  if (data != "") {
    document.getElementById("loading").style.display = "none";
    petscontainer.innerHTML = "";
    petscontainer.classList.add(
      "md:grid",
      "md:grid-cols-2",
      "lg:grid",
      "lg:grid-cols-3"
    );
    data.forEach((element) => {
      const petsCard = document.createElement("div");
      petsCard.innerHTML = `
    <div id="pet-card"
                class="card card-compact border-2 rounded-3xl shadow-xl mb-5 col-span-1 pet-card"
              >
                <figure class="p-5 rounded-2xl">
                  <img class="h-[200px] rounded-2xl w-full object-fill"
                    src="${element.image}"
                    alt="${element.category}"
                  />
                </figure>
                <div class="card-body ">
                  <h2 class="card-title">${element.pet_name}</h2>
                  <div class="flex items-center space-x-2">
                  <i class="fa-solid fa-dog"></i>
                  <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">
                    Breed: ${
                      element.breed ? `${element.breed}` : "Not available"
                    }
                  </p>
                  </div>
                  <div class="flex items-center space-x-2">
                  <i class="fa-solid fa-calendar"></i>
                  <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">Birth:${
                    element.date_of_birth
                      ? `${element.date_of_birth}`
                      : "Not Available"
                  }</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fa-solid fa-venus"></i>
                    <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">
                        Gender: ${element.gender ? `${element.gender}` : "N/A"}
                    </p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="fa-solid fa-tag"></i>
                    <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">Price: $${
                      element.price ? `${element.price}` : "N/A"
                    }</p>
                  </div>
                 
                  <div class="card-actions justify-between">
                    <button
                        onclick="petLiked('${element.image}')" 
                        class="btn btn-outline font-bold text-xs text-cyan-600"
                    >
                      <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button
                    id="${element.pet_name}"
                    onclick="adoptModal('${element.pet_name}')"
                      class="btn btn-outline font-bold text-xs text-cyan-600 adopt-btn"
                    >
                      Adopt
                    </button>
                    <button
                    onclick="petDetails('${element.petId}')" 
                      class="btn btn-outline font-bold text-xs text-cyan-600"
                    >
                      Details
                    </button>
                   
                  </div>
                </div>
              </div>
    `;
      petscontainer.appendChild(petsCard);
      const cards = document.getElementsByClassName("pet-card");
      for (const card of cards) {
        card.classList.remove("hidden");
      }
    });
  } else {
    const petscontainer = document.getElementById("show-pets");
    document.getElementById("loading").style.display = "none";
    const emptyContainer = document.createElement("div");
    emptyContainer.innerHTML = `
    <div class=" h-[200px] mt-32 flex flex-col   rounded-3xl  items-center justify-end text-center">
        <img class="w-20 h-20" src="./images/error.webp" alt="no data">
        <h3 class="font-extrabold text-4xl ">No Information Available</h3>
        <p class="text-slate-500 font-semibold text-xl">The Information you are looking for is not Available at this moment . Please Stay  Connected for latest Update. THANK YOU</p>
      </div>
    `;
    petscontainer.classList.remove(
      "md:grid",
      "md:grid-cols-2",
      "lg:grid",
      "lg:grid-cols-3"
    );
    petscontainer.prepend(emptyContainer);
    const btnSort = document.getElementById("btn-sort");
    btnSort.classList.add("btn-disabled");
  }
};

function btnStyle() {
  const btnSort = document.getElementById("btn-sort");
  const btns = document.getElementsByClassName("btn");
  for (const btn of btns) {
    btn.classList.remove("active");
    btnSort.classList.remove("btn-disabled");
  }
}
// load by category
const loadPetByCategory = async (id, btnId) => {
  console.log(id);
  const cards = document.getElementsByClassName("pet-card");
  for (const card of cards) {
    card.classList.add("hidden");
  }
  document.getElementById("loading").style.display = "block";
  const btn = document.getElementById(btnId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await res.json();
  setTimeout(() => {
    showPets(data.data);
  }, 2000);

  const btnSort = document
    .getElementById("btn-sort")
    .addEventListener("click", function () {
      const cards = document.getElementsByClassName("pet-card");
      for (const card of cards) {
        card.classList.add("hidden");
      }
      sorting(data.data);
      document.getElementById("loading").style.display = "block";
      // loading
      setTimeout(() => {
        showPets(data.data);
      }, 2000);
      // loading
    });
  btnStyle();
  btn.classList.add("active");

  const loading = document.getElementById("loading");
  loading.classList.add("block");
};

function petLiked(image) {
  console.log(image);
  const likedContainer = document.getElementById("pet-liked");
  const likedImage = document.createElement("div");
  likedImage.innerHTML = `
    <div class="col-span-1 border-2">
                <img src="${image}" alt="" />
              </div>
    `;
  likedContainer.appendChild(likedImage);
}

const petDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  console.log(data.petData);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    
            <img class="w-full h-56 object-cover" src="${
              data.petData.image
            }" alt="Pet Image">

            <div class="p-6">
                <h2 class="text-2xl font-semibold mb-2">${
                  data.petData.pet_name
                }</h2>

                <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-dog"></i>
                        <span>Breed: ${
                          data.petData.breed ? `${data.petData.breed}` : "N/A"
                        }</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-calendar"></i>
                        <span>Birth: ${
                          data.petData.date_of_birth
                            ? `${data.petData.date_of_birth}`
                            : "N/A"
                        }</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-venus"></i>
                        <span>Gender: ${
                          data.petData.gender ? `${data.petData.gender}` : "N/A"
                        }</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-tag"></i>
                        <span>Price: ${data.petData.price}$</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-syringe"></i>
                        <span>Vaccinated: ${
                          data.petData.vaccinated_status
                            ? `${data.petData.vaccinated_status}`
                            : "N/A"
                        }</span>
                    </div>
                </div>

                <hr class="my-4">

                <!-- Details Information -->
                <h3 class="text-lg font-semibold mb-2">Details Information</h3>
                <p class="text-gray-600 text-sm">
                    ${data.petData.pet_details}
                </p>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <div class="p-6 bg-gray-50 flex justify-center">
                    <button class="btn btn-outline  text-cyan-600 hover:bg-[rgba(14,122,129,0.5)] hover:text-black px-4 py-2 rounded-lg font-semibold">
                        Cancel
                    </button>
                    </div>
                </form>
            </div>            
        </div>

    </div>
  </dialog>;
  `;
  my_modal_1.showModal();
};

function adoptBtnStyle() {
  const adoptBtns = document.getElementsByClassName("adopt-btn");
  for (const btn of adoptBtns) {
    btn.classList.remove("btn-disabled");
    btn.innerText = "Adopt";
  }
}

function adoptModal(id) {
  const countdownElement = document.getElementById("countdown");
  const messageElement = document.getElementById("message");

  // Reset countdown and message visibility
  countdownElement.textContent = 3;
  countdownElement.style.display = "block";
  messageElement.style.display = "none";

  let count = 3;

  clearInterval(window.countdownInterval);

  // Countdown from 3 to 1
  window.countdownInterval = setInterval(() => {
    if (count > 1) {
      countdownElement.textContent = --count;
    } else {
      clearInterval(window.countdownInterval);
      countdownElement.style.display = "none";
      messageElement.style.display = "block";
    }
  }, 1000);

  // Show modal
  my_modal_2.showModal();

  // Disable the adopt button and update text
  const adoptBtns = document.getElementById(id);
  adoptBtns.classList.add("btn-disabled");
  adoptBtns.innerText = "Adopted";

  console.log(id);
}

document
  .getElementById("view-more-button")
  .addEventListener("click", function () {
    document.getElementById("adopt").scrollIntoView({
      behavior: "smooth",
    });
  });

loadCategory();
loadPet();
