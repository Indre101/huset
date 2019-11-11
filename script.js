const eventTemplate = querySelectorElement(".eventTemplate").content;
const upcomingEvents = querySelectorElement(".upcomingEvents");
const previousEvents = querySelectorElement(".previousEvents");
const inputTemplate = querySelectorElement(".inputTemplate").content

fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/categories").then(res => {
  return res.json()
}).then(data => {
  data.forEach(cerateCategories)
})

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


fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
  return res.json()
}).then(data => {
  data.sort(compare);
  data.forEach(showData)
}).then(filterData)



const filterIcon = querySelectorElement(".filterIcon");
const filterForm = querySelectorElement(".filter");
const submitBtn = querySelectorElement(".submitBtn");
const displayFlex = "d-flex"

filterIcon.onclick = function () {
  toggleBetweenTwoClasses(filterForm, displayNoneClass, displayFlex);
}


function compare(a, b) {
  const dateA = new Date(a.event_date);
  const dateB = new Date(b.event_date);
  return dateA - dateB
}


function showData(item) {
  item.event_name.forEach(event => {
    const cln = eventTemplate.cloneNode(true);
    const eventCard = cln.querySelector(".event");
    cln.querySelector(".eventName").textContent = event.event_name;
    cln.querySelector(".date").textContent = item.event_date;
    // cln.querySelector(".eventImg").src = event._embedded["wp:featuredmedia"][0].href;
    cln.querySelector(".eventHours").textContent = `Event starts ${event.event_time}/ Doors open ${event.door_opening_time}`
    cln.querySelector(".price").textContent = event.price;
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
    eventCard.onclick = function () {
      toggleBetweenTwoClasses(eventExtrainformation, eventHeightfitClass, eventHeightExpand);
    }

    if (compareDates(item)) {
      upcomingEvents.appendChild(cln)
    } else if (!compareDates(item)) {
      previousEvents.appendChild(cln)
    }
  })
}

const getCurrentDate = () => new Date().getTime();
const currentDate = getCurrentDate();


function compareDates(schedule) {
  const dateA = new Date(schedule.event_date).getTime()
  // const dateZ = new Date(currentDate).toLocaleDateString("eu-EU");
  if (dateA >= currentDate) {
    return true
  } else if (dateA < currentDate) {
    return false
  }
}

const options = querySelectorElement(".options");
let checkedInputs = [];
let uncheckedInputs = []
let active = "active";
let hide = "hide"

function filterData() {
  const events = querySelectAll(".event");
  submitBtn.onclick = function () {
    toggleBetweenTwoClasses(filterForm, displayFlex, displayNoneClass);
    getCheckedInputs();

    if (checkedInputs.length === 0) {
      events.forEach(e => {
        e.classList.remove("hide")
        e.classList.add("active")
      })

    } else if (checkedInputs.length > 0) {

      getEventsThatHaveTheClass(events, uncheckedInputs, active, hide)
      getEventsThatHaveTheClass(events, checkedInputs, hide, active)
      console.log(checkedInputs)
      // for (let m = 0; m < events.length; m++) {
      //   for (let n = 0; n < uncheckedInputs.length; n++) {
      //     if (events[m].classList.contains(uncheckedInputs[n])) {
      //       events[m].classList.remove("active")
      //       events[m].classList.add("hide")

      //     }
      //   }
      // }

    }

  }
}

function getEventsThatHaveTheClass(eventsArr, inputsArr, class1, class2) {
  console.log("kjkjkl")
  for (let i = 0; i < eventsArr.length; i++) {
    for (let j = 0; j < inputsArr.length; j++) {
      if (eventsArr[i].classList.contains(inputsArr[j])) {
        eventsArr[i].classList.remove(class1)
        eventsArr[i].classList.add(class2)
        filterByDate(eventsArr[i])
      }
    }
  }
}

const clearBtn = querySelectorElement(".clear");
clearBtn.addEventListener("click", clearFilters)


function clearFilters() {
  dateInput1.valueAsDate = null
  dateInput2.valueAsDate = null
  checkedInputs = [];
  uncheckedInputs = []
  const inputs = querySelectAll(".check")
  inputs.forEach(i => {
    i.checked = false
  })

}


const dateInput1 = querySelectorElement(".date1");
const dateInput2 = querySelectorElement(".date2");
const dates = querySelectAll(".date")
const erMessage = querySelectorElement(".error")



function filterByDate(oneEvent) {
  erMessage.classList.remove("d-block")
  erMessage.classList.add("d-none")
  const eventElement = new Date(oneEvent.querySelector(".date").textContent).getTime();
  const date1 = new Date(dateInput1.value).getTime();
  const date2 = new Date(dateInput2.value).getTime();
  if (!date1 || !date2) {
    return false
  } else if (date1 > date2) {
    erMessage.classList.add("d-block")
    erMessage.classList.remove("d-none")
    return false
  } else if ((eventElement < date1) || (eventElement > date2)) {
    oneEvent.classList.remove("active");
    oneEvent.classList.add("hide");
    return false
  } else if ((eventElement >= date1) && (eventElement <= date2)) {
    return true
  }
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