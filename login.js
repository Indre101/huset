const userNameInput = querySelectorElement(".logInInput")
const userPswInput = querySelectorElement(".userPsw")
const logInBtn = querySelectorElement(".logInBtn")


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
    // console.log(oneEvent.volunteer)
    // console.log(oneEvent);
    // console.log(oneEvent)

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


  const uniquevolunteers = Array.from(new Set(volunteers.map(a => a.id)))
    .map(id => {
      return volunteers.find(a => a.id === id)
    })

}