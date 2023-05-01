export const receiptFactory = (data) => {
  const { name, ingredients, time, description, appliance, ustensils } = data;

  const getReceiptCardDOM = () => {
    const col = document.createElement("div");
    col.setAttribute("class", "col col-4 mb-4");

    const card = document.createElement("div");
    card.setAttribute("class", "card receip_card");

    const cardImage = document.createElement("div");
    cardImage.setAttribute("class", "card-image");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title mt-2 mb-3");

    const cardTitleName = document.createElement("div");
    cardTitleName.setAttribute("class", "card-title-name");
    cardTitleName.textContent = name;

    const cardTitleTime = document.createElement("div");
    cardTitleTime.setAttribute("class", "card-title-time");
    cardTitleTime.innerHTML = time + " min";

    const cardText = document.createElement("div");
    cardText.setAttribute("class", "card-text");

    const cardTextIngredients = document.createElement("ul");
    cardTextIngredients.setAttribute("class", "card-text-ingredient");

    for (const ingredient of ingredients) {
      const ingredientList = document.createElement("li");
      ingredientList.innerHTML = `
        <span>${ingredient.ingredient} ${ingredient.quantity != undefined ? ":" : ""}</span>
        <span>${ingredient?.quantity || ""}</span>
        <span>${ingredient?.unit || ""}</span>
      `;
      cardTextIngredients.appendChild(ingredientList);
    }

    const cardTextDescription = document.createElement("div");
    cardTextDescription.setAttribute("class", "card-text-description");
    cardTextDescription.innerHTML = description;

    col.appendChild(card);
    card.appendChild(cardImage);
    card.appendChild(cardBody);

    cardBody.appendChild(cardTitle);
    cardTitle.appendChild(cardTitleName);
    cardTitle.appendChild(cardTitleTime);

    cardBody.appendChild(cardText);
    cardText.appendChild(cardTextIngredients);
    cardText.appendChild(cardTextDescription);

    return col;
  };

  return { getReceiptCardDOM };
};
