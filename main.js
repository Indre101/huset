const querySelectorElement = (argument) => document.querySelector(argument);
const getElementByItsID = (argument) => document.getElementById(argument);
const querySelectAll = (argument) => document.querySelectorAll(argument);

const toggleBetweenTwoClasses = (element, classNameToRemove, classNameToAdd) => {
  element.classList.toggle(classNameToRemove)
  element.classList.toggle(classNameToAdd)

}

const mbMenuIcon = querySelectorElement(".mb-menu");
const navigationMenu = querySelectorElement("nav");
const menuItems = querySelectAll(".menu-item")
const readmore = querySelectorElement(".readmore");
const textAboutHuset = querySelectorElement(".textAboutHuset");

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

const volunteerMenuInfo = getElementByItsID("volunteerMenuInfo");
const volunteerMenuAplication = getElementByItsID("aplication");


const wrapContact = getElementByItsID("wrap-contact");
const generalVolunteeringInformation = getElementByItsID("generalVolunteeringInformation");

const wrapContactClass = "wrap-contact"
const generalVolunteeringInformationClass = "generalVolunteeringInformation"

aplication.onclick = function () {
  toggleBetweenTwoClasses(wrapContact, displayNoneClass, wrapContactClass)
  toggleBetweenTwoClasses(generalVolunteeringInformation, generalVolunteeringInformationClass, displayNoneClass)

}

volunteerMenuInfo.onclick = function () {
  toggleBetweenTwoClasses(generalVolunteeringInformation, displayNoneClass, generalVolunteeringInformationClass)
  toggleBetweenTwoClasses(wrapContact, wrapContactClass, displayNoneClass)

}