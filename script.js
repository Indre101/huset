const eventTemplate = querySelectorElement(".eventTemplate").content;
const events = querySelectorElement(".events");
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



fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
  return res.json()
}).then(data => {
  data.forEach(showData)
}).then(filterData);



const filterIcon = querySelectorElement(".filterIcon");
const filterForm = querySelectorElement(".filter");
const submitBtn = querySelectorElement(".submitBtn");
const displayFlex = "d-flex"

filterIcon.onclick = function () {
  toggleBetweenTwoClasses(filterForm, displayNoneClass, displayFlex);
}


function showData(item) {
  item.event_name.forEach(showValues)
}



const options = querySelectorElement(".options");

function filterData() {

  const events = querySelectAll(".event");
  // const inputs = querySelectAll(".check")
  // const checkboxContainer = querySelectAll(".checkboxContainer");
  // checkboxContainer.forEach(containerClicked)


  // options.addEventListener("click", getCheckedInputs)
  submitBtn.onclick = function () {
    // toggleBetweenTwoClasses(filterForm, displayFlex, displayNoneClass);
    getCheckedInputs();
    // Checks the checked inputs

    for (let m = 0; m < events.length; m++) {
      for (let n = 0; n < uncheckedInputs.length; n++) {

        if (events[m].classList.contains(uncheckedInputs[n])) {
          console.log(events[m])
          events[m].classList.remove("active")
          events[m].classList.add("hide")
        }
      }
    }


    for (let i = 0; i < events.length; i++) {
      for (let j = 0; j < checkedInputs.length; j++) {
        if (events[i].classList.contains(checkedInputs[j])) {
          console.log(events[i])
          events[i].classList.remove("hide")
          events[i].classList.add("active")
        }
      }
    }
  }
}

function getCheckedInputs() {
  const inputs = querySelectAll(".check")
  inputs.forEach(checkIfCheckedAndPushValue);
}


// const noDoublicates = (arr) =>
//   arr.filter(function (item, index) {
//     console.log("called")
//     return arr.indexOf(item) >= index;
//   });

let checkedInputs = [];
let uncheckedInputs = []

function checkIfCheckedAndPushValue(input) {
  if (input.checked) {
    checkedInputs.push(input.name);
  } else if (!input.checked) {
    uncheckedInputs.push(input.name)
  }
}


const checkIfEventHasClass = (arr, input, inputText) => {
  arr.forEach(ev => {

    // if (ev.classList.contains("hide") && (ev.classList.contains(input) || ev.classList.contains(inputText))) {
    //   console.log("contains hide")
    // } else 
    if (ev.classList.contains(input) || ev.classList.contains(inputText)) {
      console.log("checkedkkk")
      // toggleBetweenTwoClasses(ev, "hide", "active");
      // ev.classList.toggle("hide")
      ev.classList.add("active")
      ev.classList.remove("hide");
      console.log(ev);


      // ev.classList.remove("hide")
      // ev.classList.add("active")
      // ev.style.display = "grid";
    } else if (!ev.classList.contains(input) || !ev.classList.contains(inputText)) {
      ev.classList.add("hide");
      ev.classList.remove("active");
    }
  });
};


const uncheckedTheInput = (arr, input, inputText) => {
  arr.forEach(ev => {
    if (ev.classList.contains(input) || ev.classList.contains(inputText)) {
      ev.classList.remove("active")
      ev.classList.add("hide")
      // ev.style.display = "none";
      // ev.style.display = "none";
      console.log(ev);
    }
  });
};



const checkIfChecked = (inputName) => {
  if (inputName.checked === false) {
    inputName.checked = true
  } else if (inputName.checked === true) {
    inputName.checked = false
  }
}




const showValues = (event, item) => {

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

  events.appendChild(cln)

}