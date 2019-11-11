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

var getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};


function getDaysCount() {
  for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {

    const a = getDaysInMonth(monthNumber, 2019)
    return a
  }
}
console.log(getDaysCount())
// console.log(getDaysInMonth(2, 2020))