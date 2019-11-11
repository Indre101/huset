const userName = querySelectorElement(".username")
const userPsw = querySelectorElement(".psw")
const logInbtn = querySelectorElement(".logInbtn")

const trySth = () => {
  console.log(userName)

}

fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/volunteer").then(res => {
  return res.json()
}).then(data => {
  data.forEach(getData)
})


function getData(volunteer) {
  console.log(volunteer)
  // console.log(volunteer.title.rendered)
  // .title.rendered)

  logInbtn.onclick = function () {
    console.log("kælk")
    console.log()
    // event.preventDefault()

    getData(volunteer.title.rendered, volunteer.pass)

  }

}

function checkTheLogIndetails(name, psw) {

  if (userName.value != name || userPsw.value != psw) {
    console.log("tryAgain")
  }


}