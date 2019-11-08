const eventTemplate = querySelectorElement(".eventTemplate").content;
const events = querySelectorElement(".events");
const inputTemplate = querySelectorElement(".inputTemplate").content

fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?per_page=100").then(res => {
  return res.json()
}).then(showData);



const noDoublicates = (arr) =>
  arr.filter(function (item, index) {
    return arr.indexOf(item) >= index;
  });

const categories = []




function showData(data) {


  data.forEach(item => {
    item.event_name.forEach(event => {

      const cln = eventTemplate.cloneNode(true);
      const eventCard = cln.querySelector(".event");
      cln.querySelector(".eventName").textContent = event.event_name;
      cln.querySelector(".date").textContent = item.event_date;
      // console.log(event)
      event.category.forEach(category => {
        let list = document.createElement("h3");
        list.textContent = category.name;
        cln.querySelector(".categories").appendChild(list);
      })


      // console.log(eventCard)


      cln.querySelector(".eventHours").textContent = `Event starts ${event.event_time}/ Doors open ${event.door_opening_time}`
      cln.querySelector(".price").textContent = event.price;
      cln.querySelector(".description").textContent = event.post_content;


      event.category.forEach(cat => {

        eventCard.classList.add(`${cat.name.toLowerCase().split(' ').join('')}`)
        categories.push(cat.name);

      })

      const eventExtrainformationContainer = cln.querySelector(".eventExtrainformationContainer");
      const eventExtrainformation = cln.querySelector(".eventExtrainformation");

      const eventHeightfitClass = "eventHeightfit";
      const eventHeightExpand = "eventHeightExpand";


      eventCard.onclick = function () {
        toggleBetweenTwoClasses(eventExtrainformation, eventHeightfitClass, eventHeightExpand);

      }


      events.appendChild(cln)
    })
    // console.log(item.event_name)

  })





  // Creates categories and appends them as input fields
  const filteredCategories = noDoublicates(categories)
  filteredCategories.forEach(cerateCategories)

  // All events selected
  const eventCards = querySelectAll(".event");

  eventCards.forEach(item => {
    // console.log(item)
  })
  // console.log(eventCards)


  const inputs = querySelectAll(".check")
  inputs.forEach(inputItem => {
    // console.log(inputItem);

    // inputItem.addEventListener("click", getTheInputValue)
  })

}

// let inputsChecked = [];

// const getTheInputValue = () => {

//   console.log(this);
//   inputsChecked.push(this );
// }


const filterByEventType = (input, nodeList) => {


  // element.classList.contains(class);


}

const cerateCategories = (cat) => {

  console.log(cat)


  let clnInput = inputTemplate.cloneNode(true);
  let checkboxName = clnInput.querySelector(".checkboxName")
  let check = clnInput.querySelector(".check");
  checkboxName.textContent = cat;
  check.name = cat.toLowerCase().split(' ').join('');



  checkboxName.onclick = function () {
    checkIfChecked(check);

  }

  querySelectorElement(".options").appendChild(clnInput);

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

submitBtn.onclick = function () {
  toggleBetweenTwoClasses(filterForm, displayFlex, displayNoneClass);

}