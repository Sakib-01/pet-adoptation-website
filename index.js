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
    button.innerHTML = `
    <button
              class="btn btn-outline font-semibold text-xl px-14 col-span-1"
            >
              <img
                class="w-8 h-8"
                src="${element.category_icon}"
                alt=""
              />${element.category}
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
                  <!-- card button  -->
                  <div class="card-actions justify-between">
                    <button
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
                    <!-- card button  -->
                  </div>
                </div>
              </div>
    `;
    petscontainer.appendChild(petsCard);
  });
};

loadCategory();
loadPet();
