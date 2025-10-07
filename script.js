// === Recept ===
const recipes = [
  {
    title: "Cheat's cheesy Focaccia",
    cuisine: "Italian",
    time: 40,
    image: "focaccia.jpg", 
    ingredients: [
      "breadmix",
      "Olive oil",
       "oregano", 
       "cheese",
    ]
  },
  {
    title: "Burnt-Scallion Fish",
    cuisine: "Asian",
    time: 25,
    image:"focaccia.jpg",
    ingredients: [
      "scallions",
      "oil",
      "fish",
    ]
  },
  {
    title: "Falafel Wrap",
    cuisine: "Middle Eastern",
    time: 35,
    image: "focaccia.jpg",
    ingredients:[
      "chickpeas",
      "onion",
      "garlic",
      "cumin",
      "coriander",
      "Fresh parsley",
      "Salt and pepper to taste",
    ]
  },
  {
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
      "salt",
    ]
  },
  {
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
      "black pepper",
    ]
  },
   {
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
      "avocado",
    ]
  },
]

console.log(recipes)


//DOM selectors
const cardsContainer = document.getElementById("cardsContainer")
const cuisineFilter = document.getElementById("cuisineFilter")
const sortSection = document.getElementById("sortOnTime")
const randomButton = document.getElementById("random-button")

const showCardsContainer = recipesArray => {
   console.log("Rendering recipes:", recipesArray.length)
  cardsContainer.innerHTML = ""

  if (!recipesArray || recipesArray.length === 0) {
    cardsContainer.innerHTML = `
  <div class="empty-message">
    <h2> Oops 😅</h2>
    <p> We couldn't find any recipes for your filter...<br>
    Try changing it or click <strong>Surprise me!</strong> 🎉
    </p>
  </div>  
 `
    return
  }
 
  recipesArray.forEach(recipe => {
   cardsContainer.innerHTML += `
    <div class="card">
        <img src="${recipe.image}" alt="${recipe.title}" />
    <div class="card-content">
      <h3>${recipe.title}</h3>
    <div class="divider"></div> 
      <p><strong>Cuisine:</strong> <span class="cuisine-value"> ${recipe.cuisine}</p>
     <p><strong>Time:</strong> <span class="time-value"> ${recipe.time} min</p>
    <div class="divider"></div>   
      <p class="ingredients-header">Ingredients:</p>
      <ul>
        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
    `
 })
}

showCardsContainer(recipes)

const filterOnCuisine = () => {
  const selected = cuisineFilter.querySelector('input[name="cuisine"]:checked')
  const selectedCuisine =selected ? selected.value : "all"            
  console.log("Selected cuisine:", selectedCuisine)

  const filtered = selectedCuisine === "all"
   ? recipes
   : recipes.filter(recipe => recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase())

   console.log("Filtered recipes:", filtered)
showCardsContainer(filtered)

}


const sortOnTime = () => {
  const selected = sortSection.querySelector('input[name="order"]:checked')
  const order =selected ? selected.value : "desc"            
  console.log("Selected order:", order)

  const sorted = [...recipes].sort((a, b) => {
    return order === "asc"
    ? a.time - b.time
    :b.time - a.time

  })

  console.log("sorted recipes:", sorted) 
showCardsContainer(sorted)

}

const getRandomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length)
  console.log("Random index:", randomIndex)

  const randomRecipe = [recipes[randomIndex]]
   console.log("Random recipe:", randomRecipe)

  showCardsContainer(randomRecipe)
}

cuisineFilter.addEventListener("change", filterOnCuisine)
sortSection.addEventListener("change", sortOnTime)
randomButton.addEventListener("click", getRandomRecipe)

