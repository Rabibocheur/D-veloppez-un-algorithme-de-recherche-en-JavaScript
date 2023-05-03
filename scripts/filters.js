export function getIngredients(recipes, tags) {
  let ingredients = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  });

  let uniqueIngredients = [...ingredients].filter((ingredient) => !tags.includes(ingredient));

  return uniqueIngredients;
}

export function getAppliances(recipes, tags) {
  let appliances = new Set();

  recipes.forEach((recipe) => {
    appliances.add(recipe.appliance);
  });

  let uniqueAppliances = [...appliances].filter((appliance) => !tags.includes(appliance));

  return uniqueAppliances;
}

export function getUstensils(recipes, tags) {
  let ustensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });

  let uniqueUstensils = [...ustensils].filter((ustensil) => !tags.includes(ustensil));

  return uniqueUstensils;
}

export function filterTags(recipes, tags) {
  const filteredData = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let ingredientsIncluded = true;

    for (let j = 0; j < tags.ingredients.length; j++) {
      const ingredient = tags.ingredients[j];
      let ingredientFound = false;

      for (let k = 0; k < recipe.ingredients.length; k++) {
        const recipeIngredient = recipe.ingredients[k];

        if (recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())) {
          ingredientFound = true;
          break;
        }
      }

      if (!ingredientFound) {
        ingredientsIncluded = false;
        break;
      }
    }

    let appliancesIncluded = true;

    for (let j = 0; j < tags.appliances.length; j++) {
      const appliance = tags.appliances[j];

      if (!recipe.appliance.toLowerCase().includes(appliance.toLowerCase())) {
        appliancesIncluded = false;
        break;
      }
    }

    let ustensilsIncluded = true;

    for (let j = 0; j < tags.ustensils.length; j++) {
      const ustensil = tags.ustensils[j];
      let ustensilFound = false;

      for (let k = 0; k < recipe.ustensils.length; k++) {
        const recipeUstensil = recipe.ustensils[k];

        if (recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())) {
          ustensilFound = true;
          break;
        }
      }

      if (!ustensilFound) {
        ustensilsIncluded = false;
        break;
      }
    }

    if (ingredientsIncluded && appliancesIncluded && ustensilsIncluded) {
      filteredData.push(recipe);
    }
  }

  return filteredData;
}

export function filterSearchBar(recipes) {
  const searchQuery = document.getElementById("search").value;
  const results = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = [];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      recipeIngredients.push(ingredient.ingredient.toLowerCase());
    }

    const recipeIngredientsText = recipeIngredients.join(" ");

    if (
      recipeName.includes(searchQuery) ||
      recipeDescription.includes(searchQuery) ||
      recipeIngredientsText.includes(searchQuery)
    ) {
      results.push(recipe);
    }
  }

  return results;
}
