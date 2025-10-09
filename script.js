const cardsContainer = document.getElementById("cardsContainer");
const cuisineFilter = document.getElementById("cuisineFilter");
const sortSection = document.getElementById("sortOnTime");
const randomButton = document.getElementById("random-button");
const API_KEY = "c0e5e1580c434758805e8f05530e9b26";
const API_KEY2 = "d4c7b9ec0f33432ea2aa56c816a17159";

const CACHE_KEY = "recipes";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

let recipes = [];

const showCardsContainer = (recipesArray) => {
  cardsContainer.innerHTML = "";
  
  if (!recipesArray || recipesArray.length === 0) {
    cardsContainer.innerHTML = `
        <div class="empty-message">
        <h2> Oops 😅</h2>
        <p> We couldn't find any recipes for your filter...<br>
        Try changing it or click <strong>Surprise me!</strong> 🎉
        </p>
        </div>  
        `;
    return;
  }

   recipesArray.forEach((recipe) => {
    console.log({ recipe });
    cardsContainer.innerHTML += `
    <div class="card">
        <img src="${recipe.image}" alt="${recipe.title}" />
    <div class="card-content">
      <h3>${recipe.title}</h3>
    <div class="divider"></div> 
      <p><strong>Cuisine:</strong> <span class="cuisine-value"> ${
        recipe?.cuisines?.length ? recipe.cuisines.join(", ") : "N/A"
      }</span></p>
     <p><strong>Time:</strong> <span class="time-value"> ${
       recipe.readyInMinutes
     } min</span></p>
    <div class="divider"></div>   
      <p class="ingredients-header">Ingredients:</p>
      <ul>
        ${recipe?.extendedIngredients
          .map(({ name }) => `<li>${name}</li>`)
          .join("")}
      </ul>
    </div>
    `;
  });
};
   
const fetchData = async () => {
  // Check localStorage first
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    try {
      const { recipes, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (!isExpired) {
        console.log("Using cached recipes");
        showCardsContainer(recipes);
        return;
      }
    } catch (error) {
      console.error("Error parsing cached data:", error);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  // Fetch fresh data if no cache or cache expired
  const params = new URLSearchParams({
    //bygger upp query param
    number: 30,
    cuisine: "Asian,Italian,Mexican,Middle Eastern",
    diet: "vegan,vegetarian,gluten free",
    type: "breakfast,main course,dessert",
    sort: "popularity",
    addRecipeInformation: true,
    instructionsRequired: true,
    fillIngredients: true,
    apiKey: API_KEY,
  });

  const URL = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    recipes = data.results;
    console.log("Fetched recipes:", recipes);

    // Save to localStorage
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        recipes,
        timestamp: Date.now(),
      })
    );

    showCardsContainer(recipes);
  } catch (error) {
    console.error("error occurred:", error);
  }
};

fetchData();

const filterOnCuisine = () => {
  const selected = cuisineFilter.querySelector('input[name="cuisine"]:checked');
  const selectedCuisine = selected ? selected.value : "all";
  console.log("Selected cuisine:", selectedCuisine);

// Använder .map() eftersom recipe.cuisines är en array ex. ["Italian", "European"]
// .toLowerCase() fungerar bara på strängar, så gör om varje element i arrayen till små bokstäver innan ja kollar med .includes()

  const filtered =
    selectedCuisine === "all"
      ? recipes
      : recipes.filter((recipe) =>
          recipe.cuisines
            ?.map((c) => c.toLowerCase())
            .includes(selectedCuisine.toLowerCase())
        );

  console.log("Filtered recipes:", filtered);
  showCardsContainer(filtered);
};

const sortOnTime = () => {
  const selected = sortSection.querySelector('input[name="order"]:checked');
  const order = selected ? selected.value : "desc";
  console.log("Selected order:", order);

  const sorted = [...recipes].sort((a, b) => {
    return order === "asc"
    ? a.readyInMinutes - b.readyInMinutes
    : b.readyInMinutes - a.readyInMinutes;
  });

  console.log("sorted recipes:", sorted);
  showCardsContainer(sorted);
};

const getRandomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  console.log("Random index:", randomIndex);

  const randomRecipe = [recipes[randomIndex]];
  console.log("Random recipe:", randomRecipe);

  showCardsContainer(randomRecipe);
};

cuisineFilter.addEventListener("change", filterOnCuisine);
sortSection.addEventListener("change", sortOnTime);
randomButton.addEventListener("click", getRandomRecipe);

