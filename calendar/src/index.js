import { Calendar } from "./js/class/calendar.js"
const container = document.querySelector("#calendar-container")

const callback = (event) => {
    alert("Usted a precionado el dia: (" +event.target.dataset.date+")");
}

const calendar = new Calendar(callback,"es","./calendar/src/example/citas.json")
calendar.render(container)