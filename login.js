const userNameInput = querySelectorElement(".logInInput")
const userPswInput = querySelectorElement(".userPsw")
const logInBtn = querySelectorElement(".logInBtn")


fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
  return res.json()
}).then(data => {
  // console.log(data)
  data.forEach(showData)
})


function showData(a) {
  console.log(a)

  logInBtn.onclick = function () {
    event.preventDefault()
    console.log(userNameInput.value)
    console.log(userPswInput.value)
    // console.log(a.pass)
    // console.log(a.title.rendered)






  }
}