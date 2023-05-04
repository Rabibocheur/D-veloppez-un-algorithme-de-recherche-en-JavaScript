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

export function filterByTags(recipes, tags) {
  const results = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    if (recipeContainsTags(recipe, tags)) {
      results.push(recipe);
    }
  }

  return results;
}

function recipeContainsTags(recipe, tags) {
  const ingredientsIncluded = recipeContainsTagIngredients(recipe, tags.ingredients);
  const appliancesIncluded = recipeContainsTagAppliances(recipe, tags.appliances);
  const ustensilsIncluded = recipeContainsTagUstensils(recipe, tags.ustensils);

  return ingredientsIncluded && appliancesIncluded && ustensilsIncluded;
}

function recipeContainsTagIngredients(recipe, tagIngredients) {
  let ingredientsIncluded = true;

  for (let j = 0; j < tagIngredients.length; j++) {
    const tagIngredient = tagIngredients[j];
    let ingredientFound = false;

    for (let k = 0; k < recipe.ingredients.length; k++) {
      const recipeIngredient = recipe.ingredients[k];

      if (recipeIngredient.ingredient.toLowerCase().includes(tagIngredient.toLowerCase())) {
        ingredientFound = true;
        break;
      }
    }

    if (!ingredientFound) {
      ingredientsIncluded = false;
      break;
    }
  }

  return ingredientsIncluded;
}

function recipeContainsTagAppliances(recipe, tagAppliances) {
  let appliancesIncluded = true;

  for (let j = 0; j < tagAppliances.length; j++) {
    const appliance = tagAppliances[j];
    if (!recipe.appliance.toLowerCase().includes(appliance.toLowerCase())) {
      appliancesIncluded = false;
      break;
    }
  }
  return appliancesIncluded;
}

function recipeContainsTagUstensils(recipe, tagUstensils) {
  let ustensilsIncluded = true;

  for (let j = 0; j < tagUstensils.length; j++) {
    const tagUstensil = tagUstensils[j];
    let ustensilFound = false;

    for (let k = 0; k < recipe.ustensils.length; k++) {
      const recipeUstensil = recipe.ustensils[k];
      if (recipeUstensil.toLowerCase().includes(tagUstensil.toLowerCase())) {
        ustensilFound = true;
        break;
      }
    }

    if (!ustensilFound) {
      ustensilsIncluded = false;
      break;
    }
  }

  return ustensilsIncluded;
}
