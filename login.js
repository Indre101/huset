const userNameInput = querySelectorElement(".logInInput")
const userPswInput = querySelectorElement(".userPsw")
const logInBtn = querySelectorElement(".logInBtn")
const logInPage = getElementByItsID("logInPage");
const loginMenuItem = querySelectorElement(".menu-item-log-in");
const closeLogIn = querySelectorElement(".closeLogIn");



fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
  return res.json()
}).then(schedules => {
  // console.log(schedules)
  schedules.forEach(getSchedules);
}).then(showVolunteers)


const volunteers = []
let filteredCategoriesArray = () =>
  volunteers.filter(function (item, index) {
    return volunteers.indexOf(item) >= index;
  });

function getSchedules(schedule) {

  schedule.event_name.forEach(oneEvent => {
    for (var key of Object.keys(oneEvent.volunteer)) {
      const volunteer = new Volunteer(oneEvent.volunteer[key].ID, oneEvent.volunteer[key].post_title, oneEvent.volunteer[key].last_name, "./img/circles.png", oneEvent.volunteer[key].pass)
      volunteers.push(volunteer);
    }
  })

}

function Volunteer(id, name, lastName, imgVolunteer, psw) {
  this.id = id;
  this.name = name;
  this.lastName = lastName;
  this.imgVolunteer = imgVolunteer;
  this.psw = psw;
}


function showVolunteers() {
  return Array.from(new Set(volunteers.map(a => a.id)))
    .map(id => {
      return volunteers.find(a => a.id === id)
    })


}

logInBtn.onclick = function () {
  event.preventDefault();

  const uniquevolunteers = showVolunteers()
  const userActive = ceckLogInInfo(uniquevolunteers)

}


const displayBlock = "d-block"

const ceckLogInInfo = (arr) => {
  return arr.find(volunteer => volunteer.name.toLowerCase() == userNameInput.value.toLowerCase() && volunteer.psw.toLowerCase() == userPswInput.value.toLowerCase())
}

loginMenuItem.onclick = function () {
  toggleBetweenTwoClasses(logInPage, displayNoneClass, displayBlock)
}
closeLogIn.onclick = function () {

  toggleBetweenTwoClasses(logInPage, displayBlock, displayNoneClass)

}

let getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};


let weekDays = getWeekDays('en-En')

function getWeekDays(locale) {
  let baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  let weekDays = [];
  for (i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, {
      weekday: 'long'
    }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}


console.log(weekDays)



function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: 'long'
  });
}






const monthTemplate = querySelectorElement(".monthTemplate").content;
const calendar = querySelectorElement(".calendar");

// const Dates() {
//   this.dayNumber = dayNumber,
//     thhis.
// }



function getDaysCount() {
  const daysArr = [];
  for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
    const daysCountInAMonth = getDaysInMonth(monthNumber, 2019)
    daysArr.push(daysCountInAMonth)
  }
  return daysArr
}


let monthNumber = 0;
const daysArr = getDaysCount()
console.log(daysArr)
daysArr.forEach(d => {

  monthNumber++;
  const clnMonth = monthTemplate.cloneNode(true);
  const days = clnMonth.querySelector(".days");

  for (let dayNumber = 1; dayNumber < d; dayNumber++) {

    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = dayNumber;
    let dateStr = `${dayNumber}/${monthNumber}/2019`;
    let dayOftheWeek = getDayName(dateStr, "en-Eu");
    console.log(dateStr)

    const weekDayName = document.createElement("p");
    weekDayName.textContent = dayOftheWeek

    day.appendChild(weekDayName)
    days.appendChild(day);
    //       console.log(dateStr)

  }

  calendar.appendChild(clnMonth)


})







// function appendDays() {
//   const clnMonth = monthTemplate.cloneNode(true);


//   let monthNumber = 0;

//   do {
//     monthNumber++
//     for (let b = 1; b <= getDaysCount(); b++) {
//       const days = clnMonth.querySelector(".days");
//       const day = document.createElement("div");
//       day.classList.add("day");
//       day.textContent = b;
//       days.appendChild(day);
//       let dateStr = `${b}/${monthNumber}/2019`;
//       let dayOftheWeek = getDayName(dateStr, "nl-NL");
//       console.log(dateStr)

//     }
//   } while (monthNumber <= 12);


//   calendar.appendChild(clnMonth)

// }


// appendDays()
// console.log(getDaysInMonth(2, 2020))