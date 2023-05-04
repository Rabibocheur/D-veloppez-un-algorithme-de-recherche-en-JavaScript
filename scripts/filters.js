export const getIngredients = (recipes, tags) => {
  let ingredients = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  });

  let uniqueIngredients = [...ingredients].filter((ingredient) => !tags.includes(ingredient));

  return uniqueIngredients;
};

export const getAppliances = (recipes, tags) => {
  let appliances = new Set();

  recipes.forEach((recipe) => {
    appliances.add(recipe.appliance);
  });

  let uniqueAppliances = [...appliances].filter((appliance) => !tags.includes(appliance));

  return uniqueAppliances;
};

export const getUstensils = (recipes, tags) => {
  let ustensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });

  let uniqueUstensils = [...ustensils].filter((ustensil) => !tags.includes(ustensil));

  return uniqueUstensils;
};

export function filterSearchBar(recipes) {
  const searchQuery = document.getElementById("search").value;
  return recipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );

    const recipeIngredientsText = recipeIngredients.join(" ");

    return (
      recipeName.includes(searchQuery) ||
      recipeDescription.includes(searchQuery) ||
      recipeIngredientsText.includes(searchQuery)
    );
  });
}

export const filterByTags = (recipes, tags) => {
  const filteredData = recipes.filter((recipe) => {
    const ingredientsIncluded = tags.ingredients.every((ingredient) =>
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );

    const appliancesIncluded = tags.appliances.every((appliance) =>
      recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
    );

    const utensilsIncluded = tags.ustensils.every((utensil) =>
      recipe.ustensils.some((recipeUtensil) =>
        recipeUtensil.toLowerCase().includes(utensil.toLowerCase())
      )
    );

    return ingredientsIncluded && appliancesIncluded && utensilsIncluded;
  });

  return filteredData;
};
