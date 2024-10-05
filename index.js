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
             onclick=loadPetByCategory('${element.category.toLowerCase()}')
              class="btn btn-outline font-semibold text-lg px-14 col-span-1"
            >
              <div class="flex items-center gap-2">
              <img
                class="w-5 h-5"
                src="${element.category_icon}"
                alt=""
              />
              <p class="border-2">${element.category}</p>
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
                  <img
                    src="${element.image}"
                    alt="${element.category}"
                  />
                </figure>
                <div class="card-body ">
                  <h2 class="card-title">${element.pet_name}</h2>
                  <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">
                    Breed: ${element.breed}
                  </p>
                  <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">Birth: ${element.date_of_birth}</p>
                  <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">
                    Gender: ${element.gender}
                  </p>
                  <p class="text-xs font-bold text-[rgba(73,73,73,0.7)]">Price: $${element.price}</p>
                 
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

// load by category
const loadPetByCategory = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await res.json();
  showPets(data.data);
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

loadCategory();
loadPet();
