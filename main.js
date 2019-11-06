const mbMenuIcon = document.querySelector(".mb-menu");
const navigationMenu = document.querySelector("nav");
const menuItems = document.querySelectorAll(".menu-item")
const readmore = document.querySelector(".readmore");
const textAboutHuset = document.querySelector(".textAboutHuset");





const displayNoneClass = "d-none";
const showMenuClass = "navigation";

const menuIconClosed = "menu-icon-closed";
const menuIconOpen = "menu-icon-open";


const textAboutHusetCollapsedClass = "textAboutHusetCollapsed";
const textAboutHusetExpandedClass = "textAboutHusetExpanded";

readmore.onclick = function () {


  toggleBetweenTwoClasses(textAboutHuset, textAboutHusetCollapsedClass, textAboutHusetExpandedClass)


  if (readmore.textContent === "Read Less") {
    readmore.textContent = "Read More"

  } else if (readmore.textContent === "Read More") {
    readmore.textContent = "Read Less"

  }

}




menuItems.forEach(item => {
  item.onclick = function () {
    toggleBetweenTwoClasses(navigationMenu, showMenuClass, displayNoneClass)
    toggleBetweenTwoClasses(mbMenuIcon, menuIconOpen, menuIconClosed)


  }
})

mbMenuIcon.onclick = function () {
  toggleBetweenTwoClasses(mbMenuIcon, menuIconClosed, menuIconOpen)
  toggleBetweenTwoClasses(navigationMenu, displayNoneClass, showMenuClass)

}


function toggleBetweenTwoClasses(element, classNameToRemove, classNameToAdd) {
  element.classList.toggle(classNameToRemove)
  element.classList.toggle(classNameToAdd)

}