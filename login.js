const userName = querySelectorElement(".logInInput")

const trySth = () => {
  console.log(userName)

}

fetch("https://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed&per_page=100").then(res => {
  return res.json()
}).then(data => {
  console.log(data)
  data.forEach(showData)
})


function showDate(a) {
  console.log(a)
}