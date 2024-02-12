import { Calendar } from "./js/class/calendar.js"
const container = document.querySelector("#calendar-container")
const calendar = new Calendar("/calendar/src/example/citas.json",(e)=>{console.log(e)},"es")
calendar.render(container)