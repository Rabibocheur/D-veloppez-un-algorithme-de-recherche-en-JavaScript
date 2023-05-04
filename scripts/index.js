import { getIngredients, getAppliances, getUstensils } from "./filters.js";
import { filterByTags, filterSearchBar } from "./filters.js";
import { recipeFactory, tagsFactory } from "./factories/DOMFactory.js";

let recipes = [];
let tags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

let selectingTagCallback = (e) => selectingTag(e);
let deletingTagCallback = (e) => deletingTag(e);

// GET API RECIPES

async function getRecipes() {
  const response = await fetch("./data/recipes.json");
  return await response.json();
}

// DISPLAY RECIPES AND TAGS

const displayRecipes = () => {
  const recipesSection = document.querySelector(".recipes_section");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const userCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(userCardDOM);
  });
};

const displayTagsLists = (items, type) => {
  const tagModel = tagsFactory(type);
  tagModel.insertTags(items);
};

// MANAGE TAGS LISTS

const selectingTag = (event) => {
  const type = event.srcElement.dataset.type;
  const value = event.srcElement.innerText;
  if (!tags[type].includes(value)) {
    const tagModel = tagsFactory(type);
    tagModel.showSelectedTags(value);
    tags[type].push(value);
    removeEventListeners();
    refreshDisplay();
  }
};

const deletingTag = (event) => {
  const type = event.target.parentElement.dataset.type;
  const value = event.target.parentElement.dataset.value;
  const index = tags[type].indexOf(value);
  if (index !== -1) {
    tags[type].splice(index, 1);
    event.target.parentElement.remove();
    refreshDisplay();
  }
};

const searchTags = (event) => {
  const parentSearchElement = event.target.parentElement.parentElement;
  const contentListTags = parentSearchElement.querySelectorAll(".select-tags-list");
  contentListTags.forEach((el) => {
    if (!el.innerText.toLowerCase().includes(event.target.value.toLowerCase())) {
      el.style.display = "none";
    } else el.style.display = "inline-block";
  });
};

const refreshEventTags = () => {
  const tags = document.querySelectorAll(".select-tags-list");
  tags.forEach((tag) => tag.addEventListener("click", selectingTagCallback));

  const deleteTags = document.querySelectorAll(".delete-tag");
  deleteTags.forEach((tag) => tag.addEventListener("click", deletingTagCallback));
};

const removeEventListeners = () => {
  const tags = document.querySelectorAll(".select-tags-list");
  tags.forEach((tag) => tag.removeEventListener("click", selectingTagCallback));

  const deleteTags = document.querySelectorAll(".delete-tag");
  deleteTags.forEach((tag) => tag.removeEventListener("click", deletingTagCallback));
};

// SEARCH PRINCIPAL BAR

const eventSearch = () => {
  const search = document.getElementById("search");
  search.addEventListener("input", () => refreshDisplay());

  const searchInputs = document.querySelectorAll(".select-tags-btn__search");
  searchInputs.forEach((input) => input.addEventListener("input", (e) => searchTags(e)));
};

// INITIALIZING THE CALL OF FUNCTIONS

const refreshDisplay = async () => {
  const tagfiltered = filterByTags(await getRecipes(), tags);
  recipes = filterSearchBar(tagfiltered);

  displayRecipes();
  displayTagsLists(getIngredients(recipes, tags.ingredients), "ingredients");
  displayTagsLists(getAppliances(recipes, tags.appliances), "appliances");
  displayTagsLists(getUstensils(recipes, tags.ustensils), "ustensils");

  refreshEventTags();
};

const init = async () => {
  refreshDisplay();
  eventSearch();
};

init();
