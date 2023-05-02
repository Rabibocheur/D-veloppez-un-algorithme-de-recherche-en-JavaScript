export async function getReceipts(tags) {
  const response = await fetch("./data/receipts.json");
  const data = await response.json();

  const filteredData = data.filter((recipe) => {
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
}

export async function getIngredients(receipts, tags) {
  let ingredients = new Set();

  receipts.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  });

  let uniqueIngredients = [...ingredients].filter((ingredient) => !tags.includes(ingredient));

  return uniqueIngredients;
}

export async function getAppliances(receipts, tags) {
  let appliances = new Set();

  receipts.forEach((receipt) => {
    appliances.add(receipt.appliance);
  });

  let uniqueAppliances = [...appliances].filter((appliance) => !tags.includes(appliance));

  return uniqueAppliances;
}

export async function getUstensils(receipts, tags) {
  let ustensils = new Set();

  receipts.forEach((receipt) => {
    receipt.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });

  let uniqueUstensils = [...ustensils].filter((ustensil) => !tags.includes(ustensil));

  return uniqueUstensils;
}
