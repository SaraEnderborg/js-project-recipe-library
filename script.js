// === Recept ===
const recipes = [
  {
    id: 1,
    title: "Cheat’s cheesy Focaccia",
    cuisine: "Italy",
    time: 40,
    image: "focaccia.jpg" ,
    ingredients: [
      "breadmix",
      "Olive oil",
      "oregano",
      "cheese"
    ]
  },
  {
    id: 2,
    title: "Burnt-Scallion Fish",
    cuisine: "Asian",
    time: 25,
    image:"focaccia.jpg",
    ingredients: [
      "scallions",
      "oil",
      "fish"
    ]
  },
  {
    id: 3,
    title: "Falafel Wrap",
    cuisine: "Middle Eastern",
    time: 35,
    image: "focaccia.jpg",
    ingredients: [ 
      "chickpeas",
      "onion",
      "garlic",
      "cumin",
      "coriander",
      "Fresh parsley",
      "Salt and pepper to taste"
    ]
  },
  {
   id: 4,
    title: "Vegan Lentil Soup",
    cuisine: "Mediterranean",
    time: 30,
    image: "focaccia.jpg",
    ingredients: [  
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ]
  },
  {
    id: 5,
    title: "Vegetarian Pesto Pasta",
    cuisine: "Italian",
    time: 25,
    image: "focaccia.jpg",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
  },
   {
    id: 6,
    title: "Dairy-Free Tacos",
    cuisine: "Mexican",
    time: 15,
    image: "focaccia.jpg",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
  },
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

