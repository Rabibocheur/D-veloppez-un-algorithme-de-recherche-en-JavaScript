export async function getReceipts() {
  const response = await fetch("./data/receipts.json");
  const data = await response.json();
  return data;
}

export async function getIngredients() {
  const response = await fetch("./data/receipts.json");
  const data = await response.json();

  let ingredients = new Set();

  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  });

  let uniqueIngredients = [...ingredients];

  return uniqueIngredients;
}

export async function getAppliances() {
  const response = await fetch("./data/receipts.json");
  const data = await response.json();

  let appliances = new Set();

  data.forEach((receipt) => {
    appliances.add(receipt.appliance);
  });

  let uniqueAppliances = [...appliances];

  return uniqueAppliances;
}

export async function getUstensils() {
  const response = await fetch("./data/receipts.json");
  const data = await response.json();

  let ustensils = new Set();

  data.forEach((receipt) => {
    receipt.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });

  let uniqueUstensils = [...ustensils];

  return uniqueUstensils;
}

// export const getProfilePhotograph = async () => {
//   const getUrl = window.location.search;
//   const searchParams = new URLSearchParams(getUrl);
//   const photographId = parseInt(searchParams.get("id"));

//   const response = await fetch("./data/photographers.json");
//   const data = await response.json();

//   const photographer = data.photographers.filter((f) => f.id === photographId);
//   const media = data.media.filter((f) => f.photographerId === photographId);

//   return { photographer, media };
// };
