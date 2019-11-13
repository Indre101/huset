const querySelectorElement = (argument) => document.querySelector(argument);
const getElementByItsID = (argument) => document.getElementById(argument);
const querySelectAll = (argument) => document.querySelectorAll(argument);

const toggleBetweenTwoClasses = (element, classNameToRemove, classNameToAdd) => {
  element.classList.toggle(classNameToRemove)
  element.classList.toggle(classNameToAdd);

}

const toggleBetweenTwoClassesWithTransition = (element, classNameToRemove, classNameToAdd, transitionClass, timeDelay) => {
  if (element.classList.contains(classNameToRemove)) {
    element.classList.remove(classNameToRemove)
    element.classList.add(classNameToAdd)
  } else if (element.classList.contains(classNameToAdd)) {
    element.classList.remove(classNameToAdd)
    element.classList.add(transitionClass)
    setTimeout(() => {
      element.classList.remove(transitionClass);
      element.classList.add(classNameToRemove)
    }, timeDelay);
  }
}


const mbMenuIcon = querySelectorElement(".mb-menu");
const navigationMenu = querySelectorElement("nav");
const menuItems = querySelectAll(".menu-item")
const readmore = querySelectorElement(".readmore");
const textAboutHuset = querySelectorElement(".hideText");

const displayNoneClass = "d-none";
const showMenuClass = "navigation";

const menuIconClosed = "menu-icon-closed";
const menuIconOpen = "menu-icon-open";



readmore.onclick = function () {

  // toggleBetweenTwoClasses(textAboutHuset, textAboutHusetCollapsedClass, textAboutHusetExpandedClass)
  textAboutHuset.style.transition = "height 0.5s linear"
  textAboutHuset.style.height = "fit-content"



  textAboutHuset.classList.toggle(".anima");
  if (readmore.textContent === "Read Less") {
    readmore.textContent = "Read More"
    textAboutHuset.style.display = "none"

  } else if (readmore.textContent === "Read More") {
    readmore.textContent = "Read Less"
    textAboutHuset.style.display = "block"

  }

}



menuItems.forEach(item => {
  item.addEventListener("click", hideMenus)
})


function hideMenus() {
  toggleBetweenTwoClasses(navigationMenu, showMenuClass, displayNoneClass)
  toggleBetweenTwoClasses(mbMenuIcon, menuIconOpen, menuIconClosed)
  toggleBetweenTwoClasses(header, "header-menu-opened", "header-menu-closed")

}



const header = querySelectorElement("header");
const navigationTransition = "navigationTransition"
const headerTransition = "headerTransition"

mbMenuIcon.onclick = function () {
  toggleBetweenTwoClasses(mbMenuIcon, menuIconClosed, menuIconOpen)
  toggleBetweenTwoClassesWithTransition(navigationMenu, displayNoneClass, showMenuClass, navigationTransition, 500)
  toggleBetweenTwoClassesWithTransition(header, "header-menu-closed", "header-menu-opened", headerTransition, 500)

}

const volunteerMenuInfo = getElementByItsID("volunteerMenuInfo");
const volunteerMenuAplication = getElementByItsID("aplication");


const wrapContact = getElementByItsID("wrap-contact");
const generalVolunteeringInformation = getElementByItsID("generalVolunteeringInformation");

const wrapContactClass = "wrap-contact"
const generalVolunteeringInformationClass = "generalVolunteeringInformation"


aplication.onclick = function () {
  if (wrapContact.classList.contains(displayNoneClass)) {
    toggleBetweenTwoClasses(wrapContact, displayNoneClass, wrapContactClass)
    toggleBetweenTwoClasses(generalVolunteeringInformation, generalVolunteeringInformationClass, displayNoneClass)
  } else if (wrapContact.classList.contains(wrapContactClass)) {
    return false
  }
}

volunteerMenuInfo.onclick = function () {
  if (generalVolunteeringInformation.classList.contains(displayNoneClass)) {
    toggleBetweenTwoClasses(wrapContact, wrapContactClass, displayNoneClass)
    toggleBetweenTwoClasses(generalVolunteeringInformation, displayNoneClass, generalVolunteeringInformationClass)

  } else if (wrapContact.classList.contains(generalVolunteeringInformationClass)) {
    return false

  }

}


// animation


const textContainerVolunteering = querySelectAll(".textContainerVolunteering");
const dots = querySelectAll(".dot");
let a = 0
let scrollCount = 0;

const vlunteeringContainer = querySelectorElement(".vlunteeringContainer");



function moveTextItems() {
  dots.forEach(d => {
    d.style.backgroundColor = "";
  })
  scrollCount++
  if (scrollCount === textContainerVolunteering.length) {
    a = 0
    scrollCount = 0;
    moveText()

  } else {
    a += 100
    moveText()
  }

}


const movingText = () => setInterval(moveTextItems, 6000);
movingText();


textContainerVolunteering.forEach(textItem => {
  textItem.addEventListener("onmouseover", stopAnimation)
})

function stopAnimation() {
  console.log("klm.,")
  clearInterval(movingText);
  setTimeout(() => {
    console.log("æløæ")

    movingText()
  }, 10000);

}

function moveText() {
  textContainerVolunteering.forEach(textItem => {
    dots[scrollCount].style.backgroundColor = "white";
    textItem.style.transform = `translateX(-${a}vw)`;
  })
}