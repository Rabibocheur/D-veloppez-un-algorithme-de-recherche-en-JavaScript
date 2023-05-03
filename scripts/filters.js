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

    const utensilsIncluded = tags.ustensils.every((utensil) =>
      recipe.ustensils.some((recipeUtensil) =>
        recipeUtensil.toLowerCase().includes(utensil.toLowerCase())
      )
    );

    return ingredientsIncluded && appliancesIncluded && utensilsIncluded;
  });

  return filteredData;
};

export const filterSearchBar = (recipes) => {
  return recipes;
};
