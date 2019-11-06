const mbMenuIcon = document.querySelector(".mb-menu");

mbMenuIcon.addEventListener("click", openMenu);

let menuClicked = false;

function openMenu() {

  mbMenuIcon.classList.toggle("mb-menu-closed")
  mbMenuIcon.classList.toggle("mb-menu-open")


}