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

loadCategory();
