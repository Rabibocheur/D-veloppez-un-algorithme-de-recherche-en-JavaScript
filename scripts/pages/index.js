import { getReceipts, getIngredients, getAppliances, getUstensils } from "../api/index.js";
import { receiptFactory } from "../factories/receiptFactory.js";

const displayReceipts = async (receipts) => {
  const receiptsSection = document.querySelector(".receipts_section");

  receipts.forEach((receipt) => {
    const receiptModel = receiptFactory(receipt);
    const userCardDOM = receiptModel.getReceiptCardDOM();
    receiptsSection.appendChild(userCardDOM);
  });
};

const displayTagsLists = async (items, targetElementClass) => {
  console.log(items);
  const tagsLists = document.querySelector(targetElementClass);
  for (const item of items) {
    const col = document.createElement("li");
    col.setAttribute("class", "col-4 select-tags-list");
    col.textContent = item;
    tagsLists.appendChild(col);
  }
};

const init = async () => {
  displayReceipts(await getReceipts());
  displayTagsLists(await getIngredients(), ".tags-lists-ingredients");
  displayTagsLists(await getAppliances(), ".tags-lists-appliances");
  displayTagsLists(await getUstensils(), ".tags-lists-ustensils");
};

init();
