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

export const filterTags = (recipes, tags) => {
  const filteredData = recipes.filter((recipe) => {
    const ingredientsIncluded = tags.ingredients.every((ingredient) =>
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );

    const appliancesIncluded = tags.appliances.every((appliance) =>
      recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
    );

    const ustensilsIncluded = tags.ustensils.every((ustensil) =>
      recipe.ustensils.some((recipeUstensil) =>
        recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())
      )
    );

    return ingredientsIncluded && appliancesIncluded && ustensilsIncluded;
  });

  return filteredData;
};

export const filterSearchBar = (recipes) => {
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
};
