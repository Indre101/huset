const userNameInput = querySelectorElement(".logInInput");
const userPswInput = querySelectorElement(".userPsw");
const logInBtn = querySelectorElement(".logInBtn");
const logInPage = getElementByItsID("logInPage");
const loginMenuItem = querySelectorElement(".menu-item-log-in");
const closeLogIn = querySelectorElement(".closeLogIn");

fetch(
  "https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100"
)
  .then(res => {
    return res.json();
  })
  .then(schedules => {
    logInBtn.onclick = function() {
      event.preventDefault();
      const uniquevolunteers = showVolunteers();
      const userActive = ceckLogInInfo(uniquevolunteers);
      //
      console.log(userActive);
      console.log(volunteerWorkdates);

      getTheScheduleOfVolunteer(schedules, userActive);
      activeCalendarDates(volunteerWorkdates, "blue");
      volunteerWorkdates = [];

      // logInPage.style.display = "none";
    };

    activeCalendarDates(schedules, "red");
    schedules.forEach(getVolunteeers);
    // schedules.forEach(getTheScheduleOfVolunteer);
  });

let volunteerWorkdates = [];

function getTheScheduleOfVolunteer(schedule, volunteerObj) {
  schedule.forEach(sch => {
    sch.event_name.forEach(ev => {
      for (var key of Object.keys(ev.volunteer)) {
        if (parseInt(key) == parseInt(volunteerObj.id)) {
          volunteerWorkdates.push(sch);

          // return sch
          // console.log(ev);
          // console.log(sch.title.rendered);
        }
        // const volunteer = new Volunteer(oneEvent.volunteer[key].ID, oneEvent.volunteer[key].post_title, oneEvent.volunteer[key].last_name, "./img/circles.png", oneEvent.volunteer[key].pass)
        // volunteers.push(volunteer);
      }
    });
  });
}

const volunteers = [];
let filteredCategoriesArray = () =>
  volunteers.filter(function(item, index) {
    return volunteers.indexOf(item) >= index;
  });

function getVolunteeers(schedule) {
  schedule.event_name.forEach(oneEvent => {
    for (var key of Object.keys(oneEvent.volunteer)) {
      const volunteer = new Volunteer(
        oneEvent.volunteer[key].ID,
        oneEvent.volunteer[key].post_title,
        oneEvent.volunteer[key].last_name,
        "./img/circles.png",
        oneEvent.volunteer[key].pass
      );
      volunteers.push(volunteer);
    }
  });
}

function activeCalendarDates(schedules, color) {
  let datesNotDisplayed = getDisplayNoneDateFields();
  schedules.forEach(schedule => {
    datesNotDisplayed.forEach(dat => {
      if (dat.textContent === schedule.title.rendered) {
        dat.parentElement.style.backgroundColor = color;
      }
    });
  });
}

const getDisplayNoneDateFields = () => querySelectAll(".notShowDate");

function Volunteer(id, name, lastName, imgVolunteer, psw) {
  this.id = id;
  this.name = name;
  this.lastName = lastName;
  this.imgVolunteer = imgVolunteer;
  this.psw = psw;
}

function showVolunteers() {
  return Array.from(new Set(volunteers.map(a => a.id))).map(id => {
    return volunteers.find(a => a.id === id);
  });
}

const displayBlock = "d-block";

const ceckLogInInfo = arr => {
  return arr.find(
    volunteer =>
      volunteer.name.toLowerCase() == userNameInput.value.toLowerCase() &&
      volunteer.psw.toLowerCase() == userPswInput.value.toLowerCase()
  );
};

loginMenuItem.onclick = function() {
  toggleBetweenTwoClasses(logInPage, displayNoneClass, displayBlock);
};
closeLogIn.onclick = function() {
  toggleBetweenTwoClasses(logInPage, displayBlock, displayNoneClass);
};

// CREATING CALENDAR
let getDaysInMonth = function(month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

let weekDays = getWeekDays("en-En");

function getWeekDays(locale) {
  let baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  let weekDays = [];
  for (i = 0; i < 7; i++) {
    weekDays.push(
      baseDate.toLocaleDateString(locale, {
        weekday: "long"
      })
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: "long"
  });
}

const monthTemplate = querySelectorElement(".monthTemplate").content;
const calendar = querySelectorElement(".calendar");

function getDaysCount() {
  const daysArr = [];
  for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
    const daysCountInAMonth = getDaysInMonth(monthNumber, 2019);
    daysArr.push(daysCountInAMonth);
  }
  return daysArr;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const numberCheck = dayNumber => {
  if (dayNumber <= 9) {
    return `0${dayNumber}`;
  } else {
    return dayNumber;
  }
};

let monthNumber = 0;
const daysArr = getDaysCount();
daysArr.forEach(d => {
  const clnMonth = monthTemplate.cloneNode(true);
  const days = clnMonth.querySelector(".days");
  const monthName = clnMonth.querySelector(".monthName");
  monthName.textContent = months[monthNumber];
  monthNumber++;
  for (let dayNumber = 1; dayNumber <= d; dayNumber++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = dayNumber;
    let dateStr = `${monthNumber}/${numberCheck(dayNumber)}/2019`;

    const notShowDate = document.createElement("div");
    notShowDate.classList.add("notShowDate");
    notShowDate.classList.add("d-none");
    notShowDate.textContent = dateStr;
    let dayOftheWeek = getDayName(dateStr, "eu-Eu");
    const weekDayName = document.createElement("p");
    weekDayName.textContent = dayOftheWeek;
    day.appendChild(notShowDate);
    day.appendChild(weekDayName);
    days.appendChild(day);
  }
  calendar.appendChild(clnMonth);
});
