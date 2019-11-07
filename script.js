const eventTemplate = querySelectorElement(".eventTemplate").content;
const events = document.querySelector(".events");
fetch("http://timidesign.org/kea/wordpress-excersize/wordpress/wordpress/wp-json/wp/v2/schedule?_embed").then(res => {
  return res.json()
}).then(showData);


function showData(data) {
  data.forEach(item => {
    item.event_name.forEach(event => {

      const cln = eventTemplate.cloneNode(true);
      cln.querySelector(".eventName").textContent = event.event_name;
      cln.querySelector(".date").textContent = item.event_date;
      console.log(event)
      event.category.forEach(category => {
        let list = document.createElement("h3");
        list.textContent = category.name;
        cln.querySelector(".categories").appendChild(list);
      })

      cln.querySelector(".eventHours").textContent = `Event starts ${event.event_time}/ Doors open ${event.door_opening_time}`
      cln.querySelector(".price").textContent = event.price;
      cln.querySelector(".description").textContent = event.post_content;

      const eventCard = cln.querySelector(".event");
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

}