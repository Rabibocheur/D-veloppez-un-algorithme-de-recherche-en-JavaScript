const toggleContentTags = (contentTagsLists) => {
  const isOpen = contentTagsLists.dataset.open === "true";
  contentTagsLists.dataset.open = !isOpen;
  return !isOpen;
};

const toggleSelectBtn = (btnSelect, btnIcon) => {
  btnSelect.classList.toggle("close");
  btnSelect.classList.toggle("open");
  btnIcon.classList.toggle("rotate");
};

const toggleSearchBar = (isOpen, btnText, btnSearch) => {
  if (isOpen) {
    btnText.style.display = "none";
    btnSearch.style.display = "block";
  } else {
    btnText.style.display = "block";
    btnSearch.style.display = "none";
  }
};

const handleClickOutside = (selectTags, btnSelect, handleClick) => {
  const handleOutsideClick = (event) => {
    if (!selectTags.contains(event.target)) {
      handleClick();
      window.removeEventListener("click", handleOutsideClick);
    }
  };
  window.addEventListener("click", handleOutsideClick);
};

const gestionContentTags = (selectTags, btnSelect) => {
  const contentTagsLists = selectTags.querySelector(".select-tags-content");
  const btnSearch = selectTags.querySelector(".select-tags-btn__search");
  const btnText = selectTags.querySelector(".select-tags-btn__text");
  const btnIcon = selectTags.querySelector(".select-tags-icon");

  const isOpen = toggleContentTags(contentTagsLists);
  toggleSelectBtn(btnSelect, btnIcon);
  toggleSearchBar(isOpen, btnText, btnSearch);

  if (isOpen) {
    handleClickOutside(selectTags, btnSelect, () => gestionContentTags(selectTags, btnSelect));
  }
};

const openContentTags = (selectTags, btnSelect) => {
  const contentTagsLists = selectTags.querySelector(".select-tags-content");
  if (contentTagsLists.dataset.open === "false") gestionContentTags(selectTags, btnSelect);
};

const initSelectTags = () => {
  const allSelectTags = document.querySelectorAll(".select-tags");
  allSelectTags.forEach((selectTags) => {
    const btnSelect = selectTags.querySelector(".select-tags-btn");
    btnSelect.addEventListener("click", () => openContentTags(selectTags, btnSelect));
  });
};

initSelectTags();
