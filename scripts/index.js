import { getReceipts, getIngredients, getAppliances, getUstensils } from "./api/index.js";
import { receiptFactory, tagsFactory } from "./factories/receiptFactory.js";

let receipts = [];
let tags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

const displayReceipts = async () => {
  const receiptsSection = document.querySelector(".receipts_section");
  receiptsSection.innerHTML = "";
  receipts.forEach((receipt) => {
    const receiptModel = receiptFactory(receipt);
    const userCardDOM = receiptModel.getReceiptCardDOM();
    receiptsSection.appendChild(userCardDOM);
  });
};

const displayTagsLists = async (items, type) => {
  const tagModel = tagsFactory(type);
  tagModel.insertTags(items);
};

const selectingTag = (event) => {
  const type = event.srcElement.dataset.type;
  const value = event.srcElement.innerText;
  if (!tags[type].includes(value)) {
    const tagModel = tagsFactory(type);
    tagModel.showSelectedTags(value);
    tags[type].push(value);
    init();
  }
};

const deletingTag = (event) => {
  const type = event.target.parentElement.dataset.type;
  const value = event.target.parentElement.dataset.value;
  const index = tags[type].indexOf(value);
  if (index !== -1) {
    tags[type].splice(index, 1);
    event.target.parentElement.remove();
    init();
  }
};

const searchTags = (event) => {
  const parentSearchElement = event.target.parentElement.parentElement;
  const contentListTags = parentSearchElement.querySelectorAll(".select-tags-list");
  contentListTags.forEach((el) => {
    if (!el.innerText.includes(event.target.value)) {
      el.style.display = "none";
    } else el.style.display = "inline-block";
  });
};

const eventSelectTags = () => {
  const tags = document.querySelectorAll(".select-tags-list");
  tags.forEach((tag) => tag.addEventListener("click", (e) => selectingTag(e)));

  const deleteTags = document.querySelectorAll(".delete-tag");
  deleteTags.forEach((tag) => tag.addEventListener("click", (e) => deletingTag(e)));

  const searchInputs = document.querySelectorAll(".select-tags-btn__search");
  searchInputs.forEach((input) => input.addEventListener("input", (e) => searchTags(e)));
};

const init = async () => {
  receipts = await getReceipts(tags);
  displayReceipts();

  displayTagsLists(await getIngredients(receipts, tags.ingredients), "ingredients");
  displayTagsLists(await getAppliances(receipts, tags.appliances), "appliances");
  displayTagsLists(await getUstensils(receipts, tags.ustensils), "ustensils");
  eventSelectTags();
};

init();
