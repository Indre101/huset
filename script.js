window.addEventListener("DOMContentLoaded", init)


const eventTemplate = querySelectorElement(".eventTemplate").content;
const upcomingEvents = querySelectorElement(".upcomingEvents");
const previousEvents = querySelectorElement(".previousEvents");
const inputTemplate = querySelectorElement(".inputTemplate").content
const spinner = document.getElementById("spinner");


function init() {

  spinner.removeAttribute('hidden');

  fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/categories").then(res => {
    return res.json()
  }).then(data => {
    data.forEach(cerateCategories)
  })


  fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
    return res.json()
  }).then(data => {
    spinner.setAttribute('hidden', '');
    data.sort(compare);
    data.forEach(showData)
  }).then(filterData)

}


function compareDates(schedule) {
  const dateA = new Date(schedule.event_date).getTime()
  if (dateA >= currentDate) {
    return true
  } else if (dateA < currentDate) {
    return false
  }
}


const cerateCategories = (cat) => {
  if (cat.parent == 0) {
    return false
  } else {
    let clnInput = inputTemplate.cloneNode(true);
    let checkboxName = clnInput.querySelector(".checkboxName")
    let check = clnInput.querySelector(".check");
    checkboxName.textContent = cat.name;
    check.name = cat.name.toLowerCase().split(' ').join('');
    checkboxName.onclick = function () {
      checkIfChecked(check);
    }
    querySelectorElement(".options").appendChild(clnInput);
  }
}






const filterIcon = querySelectorElement(".filterIcon");
const filterForm = querySelectorElement(".filter");
const submitBtn = querySelectorElement(".submitBtn");
const displayFlex = "d-flex"

filterIcon.onclick = function () {
  toggleBetweenTwoClassesWithTransition(filterForm, displayNoneClass, "filterAnimation", "filterAnimationTransition", 500)
  // toggleBetweenTwoClasses(filterForm, displayNoneClass, displayFlex);
}


function compare(a, b) {
  const dateA = new Date(a.event_date);
  const dateB = new Date(b.event_date);
  return dateA - dateB
}


function showData(item) {
  item.event_name.forEach(event => {
    appendEvents(event, item, upcomingEvents, previousEvents)
  })
}



const appendEvents = (event, item, firstParent, secondParent) => {
  const cln = eventTemplate.cloneNode(true);
  const eventCard = cln.querySelector(".event");
  cln.querySelector(".eventName").textContent = event.event_name;
  cln.querySelector(".date").textContent = item.event_date;
  cln.querySelector(".eventHours").textContent = `Event starts ${event.event_time}/`
  cln.querySelector(".doorsOpen").textContent = `Doors open ${event.door_opening_time}`
  const volunteerBtn = cln.querySelector(".volunteerBtn")
  if (event.price == 0) {
    cln.querySelector(".price").textContent = `FREE`;

  } else {
    cln.querySelector(".price").textContent = `Price ${event.price},-`;

  }
  cln.querySelector(".description").textContent = event.post_content;
  event.category.forEach(category => {
    let list = document.createElement("h3");
    list.textContent = category.name;
    cln.querySelector(".categories").appendChild(list);
    eventCard.classList.add(`${category.name.toLowerCase().split(' ').join('')}`)

  })
  const eventExtrainformationContainer = cln.querySelector(".eventExtrainformationContainer");
  const eventExtrainformation = cln.querySelector(".eventExtrainformation");
  const eventHeightfitClass = "eventHeightfit";
  const eventHeightExpand = "eventHeightExpand";
  cln.querySelector(".eventImg").onclick = function () {
    toggleBetweenTwoClasses(eventExtrainformation, eventHeightfitClass, eventHeightExpand);
  }

  if (compareDates(item)) {
    cln.querySelector(".eventImg").style.backgroundImage = `url(${event.image.guid})`;
    firstParent.appendChild(cln)
  } else if (!compareDates(item)) {


    cln.querySelector(".eventImg").style.backgroundImage = `linear-gradient(to bottom, #07081399, #000000), url(${event.image.guid})`;

    eventCard.style.opacity = "0.7";
    volunteerBtn.style.display = "none";
    secondParent.appendChild(cln)
  }

}



const getCurrentDate = () => new Date().getTime();
const currentDate = getCurrentDate();



const options = querySelectorElement(".options");
let checkedInputs = [];
let uncheckedInputs = []
let active = "active";
let hide = "hide"

function filterData() {
  const events = querySelectAll(".event");
  submitBtn.onclick = function () {
    getCheckedInputs();
    if (checkedInputs.length === 0 && Date.parse(dateInput1.value) && Date.parse(dateInput2.value)) {
      checkEventsForJustDate(events)

    } else if (checkedInputs.length === 0) {
      events.forEach(e => {
        e.classList.remove("hide")
        e.classList.add("active")
      })
      toggleBetweenTwoClassesWithTransition(filterForm, displayNoneClass, "filterAnimation", "filterAnimationTransition", 500)
    } else if (checkedInputs.length > 0) {
      getEventsThatHaveTheClass(events, uncheckedInputs, active, hide)
      getEventsThatHaveTheClass(events, checkedInputs, hide, active)
    }

  }

  clearBtn.onclick = function () {
    clearFilters(events)
  }
}



function getEventsThatHaveTheClass(eventsArr, inputsArr, class1, class2) {
  for (let i = 0; i < eventsArr.length; i++) {
    for (let j = 0; j < inputsArr.length; j++) {
      if (eventsArr[i].classList.contains(inputsArr[j])) {
        eventsArr[i].classList.remove(class1)
        eventsArr[i].classList.add(class2)
        filterByDate(eventsArr[i], "none", "none")
      }
    }
  }
}

function checkEventsForJustDate(param) {

  for (let i = 0; i < param.length; i++) {
    filterByDate(param[i], "hide", "active")
  }
}

const clearBtn = querySelectorElement(".clear");


function clearFilters(param) {
  dateInput1.valueAsDate = null
  dateInput2.valueAsDate = null
  checkedInputs = [];
  uncheckedInputs = []
  const inputs = querySelectAll(".check")
  inputs.forEach(i => {
    i.checked = false
  })

  param.forEach(e => {
    e.classList.add("active")
    e.classList.remove("hide")

  })

  erMessage.classList.remove("d-block")
  erMessage.classList.add("d-none")

}


const dateInput1 = querySelectorElement(".date1");
const dateInput2 = querySelectorElement(".date2");
const dates = querySelectAll(".date")
const erMessage = querySelectorElement(".error")


function filterByDate(oneEvent, classRemove, classAdd) {

  erMessage.classList.remove("d-block")
  erMessage.classList.add("d-none")
  const eventElement = new Date(oneEvent.querySelector(".date").textContent).getTime();
  const date1 = new Date(dateInput1.value).getTime();
  const date2 = new Date(dateInput2.value).getTime();



  if (date1 > date2) {
    showErrMessage(erMessage)
    // return false
  } else if ((eventElement < date1) || (eventElement > date2)) {
    oneEvent.classList.remove("active");
    oneEvent.classList.add("hide");
    toggleBetweenTwoClassesWithTransition(filterForm, displayNoneClass, "filterAnimation", "filterAnimationTransition", 500)

    // return false
  } else if ((eventElement >= date1) && (eventElement <= date2)) {
    toggleBetweenTwoClassesWithTransition(filterForm, displayNoneClass, "filterAnimation", "filterAnimationTransition", 500)
    oneEvent.classList.add(classAdd);
    oneEvent.classList.remove(classRemove);

    // return true
  } else if (!Date.parse(dateInput1.value) && !Date.parse(dateInput2.value)) {
    toggleBetweenTwoClassesWithTransition(filterForm, displayNoneClass, "filterAnimation", "filterAnimationTransition", 500)
    // return false
  } else if (!Date.parse(dateInput1.value) || !Date.parse(dateInput2.value)) {
    showErrMessage(erMessage)
    // return false
  }
}


function showErrMessage(erorMessage) {
  erorMessage.classList.add("d-block")
  erorMessage.classList.remove("d-none")
}

function getCheckedInputs() {
  checkedInputs = [];
  uncheckedInputs = []
  const inputs = querySelectAll(".check")
  inputs.forEach(checkIfCheckedAndPushValue);
}

function checkIfCheckedAndPushValue(input) {
  if (input.checked) {
    checkedInputs.push(input.name);
  } else if (!input.checked) {
    uncheckedInputs.push(input.name)
  }
}

const checkIfChecked = (inputName) => {
  if (inputName.checked === false) {
    inputName.checked = true
  } else if (inputName.checked === true) {
    inputName.checked = false
  }
}