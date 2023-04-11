const gestionContentTags = (btnSelect) => {
  const selectTags = btnSelect.parentElement;
  const contentTagsLists = selectTags.querySelector(".select-tags-content");
  const btnSearch = selectTags.querySelector(".select-tags-btn__search");
  const btnIcon = selectTags.querySelector(".select-tags-icon");

  if (contentTagsLists.dataset.open === "true" && btnSearch != document.activeElement) {
    switchBtnTextAndSearch(selectTags, "search");
    return;
  }

  contentTagsLists.dataset.open = contentTagsLists.dataset.open === "false" ? "true" : "false";

  btnSelect.classList.toggle("close");
  btnSelect.classList.toggle("open");
  btnIcon.classList.toggle("rotate");

  if (contentTagsLists.dataset.open === "true") {
    switchBtnTextAndSearch(selectTags, "search");
    btnSearch.addEventListener("blur", () => switchBtnTextAndSearch(selectTags, "text"));
  } else {
    switchBtnTextAndSearch(selectTags, "text");
  }
};

const switchBtnTextAndSearch = (selectTags, value) => {
  const btnText = selectTags.querySelector(".select-tags-btn__text");
  const btnSearch = selectTags.querySelector(".select-tags-btn__search");

  if (value == "search") {
    btnText.style.display = "none";
    btnSearch.style.display = "block";
    btnSearch.focus();
  } else if (value == "text") {
    btnText.style.display = "block";
    btnSearch.style.display = "none";
  }
};

const initTags = () => {
  const allBtnSelect = document.querySelectorAll(".select-tags-btn");
  allBtnSelect.forEach((btn) => btn.addEventListener("click", () => gestionContentTags(btn)));
};

initTags();
