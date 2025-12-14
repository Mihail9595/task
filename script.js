const buttonsContainer = document.querySelector(".nav__categories");
const cardsContainer = document.querySelector(".cards-container");
const searchInput = document.querySelector(".field__input");
const footer = document.querySelector(".footer");

const categories = [
  { name: "All", quantity: 17 },
  { name: "Marketing", quantity: 4 },
  { name: "Management", quantity: 3 },
  { name: "HR & Recruting", quantity: 5 },
  { name: "Design", quantity: 2 },
  { name: "Development", quantity: 3 },
];

const cards = [
  {
    name: "Marketing",
    description: "The Ultimate Google Ads Training Course",
    price: "$100",
    author: "by Jerome Bell",
    image: "image-1",
    color: "rgba(3, 206, 164, 1)",
  },
  {
    name: "Management",
    description: "Product Management Fundamentals",
    price: "$480",
    author: "by Marvin McKinney",
    image: "image-2",
    color: "rgba(90, 135, 252, 1)",
  },
  {
    name: "HR & Recruting",
    description: "HR  Management and Analytics",
    price: "$200",
    author: "by Leslie Alexander Li",
    image: "image-3",
    color: "rgba(248, 152, 40, 1)",
  },
  {
    name: "Marketing",
    description: "Brand Management & PR Communications",
    price: "$530",
    author: "by Kristin Watson",
    image: "image-4",
    color: "rgba(3, 206, 164, 1)",
  },
  {
    name: "Design",
    description: "Graphic Design Basic",
    price: "$500",
    author: "by Guy Hawkins",
    image: "image-5",
    color: "rgba(245, 47, 110, 1)",
  },
  {
    name: "Management",
    description: "Business Development Management",
    price: "$400",
    author: "by Dianne Russell",
    image: "image-6",
    color: "rgba(90, 135, 252, 1)",
  },
  {
    name: "Development",
    description: "Highload Software Architecture",
    price: "$600",
    author: "by Brooklyn Simmons",
    image: "image-7",
    color: "rgba(119, 114, 241, 1)",
  },
  {
    name: "HR & Recruting",
    description: "Human Resources – Selection and Recruitment",
    price: "$150",
    author: "by Kathryn Murphy",
    image: "image-8",
    color: "rgba(248, 152, 40, 1)",
  },
  {
    name: "Design",
    description: "User Experience. Human-centered Design",
    price: "$240",
    author: "by Cody Fisher",
    image: "image-9",
    color: "rgba(245, 47, 110, 1)",
  },
];

function renderCategories(categories) {
  buttonsContainer.innerHTML = categories
    .map(
      (cat, index) => `<button
              data-category="${cat.name}"
              class="nav__categories-btn 
       ${index === 0 ? "nav__categories-btn--active" : ""} 
              "
            >
              ${cat.name} <sup>${cat.quantity}</sup>
            </button>`
    )
    .join("");
}

function removeClassButtonActive() {
  buttonsContainer.querySelectorAll(".nav__categories-btn").forEach((btn) => {
    btn.classList.remove("nav__categories-btn--active");
  });
}

function renderCards(cards) {
  if (cards.length === 0) {
    footer.style.display = "none";
    return (cardsContainer.innerHTML = `<div style="text-align: center; font-weight: bold;">nothing found</div>`);
  } else footer.style.display = "flex";

  cardsContainer.innerHTML = cards
    .map(
      (card) =>
        `  <div class="card">
              <img class="card__image" src="./public/card/${card.image}.png" alt="Фото" />
              <div class="card__info">
                <div class="card__info-text">
                  <h2 style="background-color: ${card.color}"
                   class="card__title">${card.name}</h2>
                </div>
                <p class="card__description">
                  ${card.description}
                </p>
                <div class="card__footer">
                  <span class="card__price">${card.price}</span> |
                  <span class="card__author">${card.author}</span>
                </div>
              </div>
            </div>`
    )
    .join("");
}

buttonsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".nav__categories-btn");

  if (!button) return;
  searchInput.value = "";

  removeClassButtonActive();

  button.classList.add("nav__categories-btn--active");

  const category = button.getAttribute("data-category");
  const filterCards = cards.filter((card) => card.name === category);

  const cardsToRender = filterCards.length > 0 ? filterCards : cards;
  renderCards(cardsToRender);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  removeClassButtonActive();

  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(query) ||
      card.description.toLowerCase().includes(query) ||
      card.author.toLowerCase().includes(query)
  );

  renderCards(filteredCards);

  if (!query) {
    buttonsContainer
      .querySelector(".nav__categories-btn")
      .classList.add("nav__categories-btn--active");
  }
});

renderCategories(categories);
renderCards(cards);
