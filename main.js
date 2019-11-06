const mbMenuIcon = document.querySelector(".mb-menu");
const navigationMenu = document.querySelector("nav");

console.log(navigationMenu)

const displayNoneClass = "d-none";
const showMenuClass = "navigation";

const menuIconClosed = "menu-icon-closed";
const menuIconOpen = "menu-icon-open";



mbMenuIcon.onclick = function () {
  toggleBetweenTwoClasses(mbMenuIcon, menuIconClosed, menuIconOpen)
  toggleBetweenTwoClasses(navigationMenu, displayNoneClass, showMenuClass)

}





function toggleBetweenTwoClasses(element, classNameToRemove, classNameToAdd) {
  element.classList.toggle(classNameToRemove)
  element.classList.toggle(classNameToAdd)

}