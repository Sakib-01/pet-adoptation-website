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

// load pets

const loadPet = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  showPets(data.pets);
};

const showPets = (data) => {
  const petscontainer = document.getElementById("show-pets");
  petscontainer.innerHTML = "";
  data.forEach((element) => {
    const petsCard = document.createElement("div");
    petsCard.innerHTML = `
    <div
                class="card card-compact border-2 rounded-3xl shadow-xl mb-5 col-span-1"
              >
                <figure class="p-5 rounded-2xl">
                  <img class="h-[160px] rounded-2xl"
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
                      element.price
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
                      class="btn btn-outline font-bold text-xs text-cyan-600"
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
  });
};

function btnStyle() {
  const btns = document.getElementsByClassName("btn");
  for (const btn of btns) {
    btn.classList.remove("active");
  }
}
// load by category
const loadPetByCategory = async (id, btnId) => {
  console.log(id);
  const btn = document.getElementById(btnId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await res.json();
  showPets(data.data);
  btnStyle();
  btn.classList.add("active");
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
    
            <img class="w-full h-64 object-cover" src="${
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

loadCategory();
loadPet();
