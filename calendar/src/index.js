import { Calendar } from "./js/class/calendar.js"
const container = document.querySelector("#calendar-container")
const calendar = new Calendar((e)=>{console.log(e)},"es","/calendar/src/example/citas.json")
calendar.render(container)