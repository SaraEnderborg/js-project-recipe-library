// === Recept ===
const recipes = [
  {
    id: 1,
    title: "Cheat’s cheesy Focaccia",
    cuisine: "Italy",
    time: 40,
    image: "https://via.placeholder.com/300x180?text=Focaccia",
    ingredients: [
      "500 g bread mix",
      "Olive oil",
      "2 tbsp dried oregano",
      "75 g grated cheese"
    ]
  },
  {
    id: 2,
    title: "Burnt-Scallion Fish",
    cuisine: "China",
    time: 25,
    image: "https://via.placeholder.com/300x180?text=Fish",
    ingredients: [
      "8 scallions",
      "2 tbsp oil",
      "2 fish fillets"
    ]
  },
  {
    id: 3,
    title: "Falafel Wrap",
    cuisine: "Middle Eastern",
    time: 35,
    image: "https://via.placeholder.com/300x180?text=Falafel+Wrap",
    ingredients: [
      "200 g dried chickpeas, soaked overnight",
      "1 small onion, chopped",
      "2 cloves garlic, minced",
      "1 tsp ground cumin",
      "1 tsp ground coriander",
      "Fresh parsley, chopped",
      "Salt and pepper to taste"
    ]
  }
];

// === Variabler och DOM-element ===
let selectedCuisine = "All";
let sortOrder = "desc";
let selectedCardId = null;

const cardsContainer = document.getElementById("cardsContainer");

// === Funktion för att skapa ett receptkort ===
const createCardHTML = r => `
  <div class="card ${selectedCardId === r.id ? "selected" : ""}" data-id="${r.id}">
    <img src="${r.image}" alt="${r.title}">
    <div class="card-content">
      <h3>${r.title}</h3>
      <p><strong>Cuisine:</strong> ${r.cuisine}</p>
      <p><strong>Time:</strong> ${r.time} minutes</p>
      <h4>Ingredients:</h4>
      <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>
  </div>
`;

// === Funktion för att visa korten ===
function renderCards() {
  const filtered = recipes
    .filter(r => selectedCuisine === "All" || r.cuisine === selectedCuisine)
    .sort((a, b) => sortOrder === "asc" ? a.time - b.time : b.time - a.time);

  cardsContainer.innerHTML = filtered.map(createCardHTML).join("");
}

// === Event-lyssnare ===

// För både filter och sorteringsknappar
document.querySelectorAll('input[name="cuisine"], input[name="order"]')
  .forEach(input => input.addEventListener("change", () => {
    if (input.name === "cuisine") selectedCuisine = input.value;
    if (input.name === "order") sortOrder = input.value;
    renderCards();
  }));

// För att markera kort
cardsContainer.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) {
    selectedCardId = Number(card.dataset.id);
    renderCards();
  }
});

// === Starta ===
renderCards();

