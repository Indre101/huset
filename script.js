const eventTemplate = querySelectorElement(".eventTemplate").content;
const events = querySelectorElement(".events");
const inputTemplate = querySelectorElement(".inputTemplate").content

fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
  return res.json()
}).then(data => {
  data.forEach(showData)
});


fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/categories").then(res => {
  return res.json()
}).then(data => {
  data.forEach(cerateCategories)
});


// const noDoublicates = (arr) =>
//   arr.filter(function (item, index) {
//     return arr.indexOf(item) >= index;
//   });

const options = querySelectorElement(".options");


function showData(item) {

  item.event_name.forEach(showValues)
  // All events selected
  const eventCards = querySelectAll(".event");
  // Checks if any input is selected;
  const inputs = querySelectAll(".check")


  submitBtn.onclick = function () {
    // toggleBetweenTwoClasses(filterForm, displayFlex, displayNoneClass);
    const checkedInputsNames = () => inputs.forEach(getCheckedInputName)
    const getCheckedInputName = (inputItem) => inputItem.checked ? checkedInputs.push(inputItem.name) : false;


    checkedInputs.forEach(i => {
      console.log(i)
    })

    // console.log(checkedInputs)
    checkedInputsNames()
    eventCards.forEach(item => {



      // console.log(item);
      // console.log(item.classList.contains(checkedInputsNames()));

      // console.log(item)
    })
    // console.log(eventCards)
  }

}


let checkedInputs = []



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





const cerateCategories = (cat) => {
  if (cat.parent == 0) {
    return false
  } else {
    console.log(cat)
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






const checkIfChecked = (inputName) => {
  if (inputName.checked === false) {
    inputName.checked = true
  } else if (inputName.checked === true) {
    inputName.checked = false
  }
}



const filterIcon = querySelectorElement(".filterIcon");
const filterForm = querySelectorElement(".filter");
const submitBtn = querySelectorElement(".submitBtn");
const displayFlex = "d-flex"

filterIcon.onclick = function () {
  toggleBetweenTwoClasses(filterForm, displayNoneClass, displayFlex);
}