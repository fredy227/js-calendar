import Basic from "../basic.js"
import { Calendar } from "./calendar.js"

export class MakeCalendar {
    /**
     * @type {HTMLElement}
     */
    #structure
    #lang
    #handlerClick
    #url
    #bearerToken
    #currentDate = new Date()
    #formatCurrentDate = `${this.#currentDate.getFullYear()}-${(this.#currentDate.getMonth() + 1).toString().padStart(2, "0")}-${this.#currentDate.getDate().toString().padStart(2, "0")}`
    /**
     * 
     * @param {string} lang -en->english, es->espanol
     */
    constructor(HandlerClick, lang, url, bearerToken) {
        this.#lang = lang
        this.#handlerClick = HandlerClick
        this.#url = url
        this.#bearerToken = bearerToken
        console.log(this.#formatCurrentDate)
    }

    #createStructure() {
        const c = Basic.create
        const container = c("div", "_calendar-container")
        const header = c("div", "_calendar-header")
        const weekOlContainer = c("div", "_calendar-week-days-container")
        const weekOl = c("ol", "_calendar-week-days-ol")
        Basic.date.daysArray(this.#lang).forEach(day => {
            const li = c("li", "_calendar-week-days")
            li.innerText = day
            weekOl.appendChild(li)
        })
        weekOlContainer.appendChild(weekOl)
        header.appendChild(this.actionBtn())
        header.appendChild(weekOlContainer)
        // elemento que contendra los dias del mes 
        const body = c("div", "_calendar-month-days-container _cmd_u_")
        body.appendChild(this.fillCalendar())


        container.appendChild(header)
        container.appendChild(body)
        this.#structure = container
    }

    actionBtn() {
        const parent = Basic.create("div", "_calendar-action-btn-container")
        const div1 = Basic.create("div")
        const year = Basic.create("span", "_calendar-current-year _cy_u_")
        year.innerText = Basic.date.date.getFullYear()
        div1.appendChild(year)

        const div2 = Basic.create("div")
        const prevMonth = Basic.create("button", "_calendar-action-btn __n-m")
        prevMonth.addEventListener("click", () => {
            Basic.date.prevMonth()
            this.updateCalendar()
            this.resize()

        })
        const month = Basic.create("span", "_calendar-current-month _cm_u_")
        month.innerText = Basic.date.getStringMonth(Basic.date.date.getMonth(), this.#lang)
        const nextMonth = Basic.create("button", "_calendar-action-btn __p_m")
        nextMonth.addEventListener("click", () => {
            Basic.date.nextMonth()
            this.updateCalendar()
            this.resize()
        })
        const c_month = Basic.create("div")
        const c_btns = Basic.create("div")
        c_month.appendChild(month)
        c_btns.appendChild(prevMonth)
        c_btns.appendChild(nextMonth)

        div2.appendChild(c_month)
        div2.appendChild(c_btns)

        parent.appendChild(div1)
        parent.appendChild(div2)
        return parent

    }

    fillCalendar() {
        const c = Basic.create
        const ol = c("ol", "_calendar-month-ol")
        for (let i = 1; i <= Basic.date.countDays(); i++) {
            const cell = c("li", "_calendar-month-day-cell rs_c_u_0")
            const button = c("button", "_calendar-month-day-button _btn_e_0")
            if (i == 1){
                cell.classList.add(`_calendar-first-day-${Basic.date.firstDay()}`)
                cell.style.gridColumnStart=`${Basic.date.firstDay()}`
            }
            if (Basic.date.getDateFormat(i) == this.#formatCurrentDate) button.classList.add("_calendar-print-today")
            button.addEventListener("click", this.#handlerClick)
            button.setAttribute("data-date", Basic.date.getDateFormat(i))
            button.innerText = i.toString().padStart(2, "0")
            cell.appendChild(button)
            ol.appendChild(cell)
        }
        return ol

    }
    resize() {
        document.querySelectorAll(".rs_c_u_0").forEach(elm => {
            const height = elm.clientWidth
            elm.style.height=`${Math.floor(height)}px`
        })
    }
    resizeEvent(container) {
        new ResizeObserver(this.resize).observe(container)
    }
    printEvents(events) {
        let arr = {}
        events.forEach(event => {
            arr[event.date] = (arr[event.date] || 0) + 1
        })
        events.map(event => {
            const element = document.querySelector(`[data-date="${event.date}"]`)
            if (element) {
                const parent = element.parentNode
                if (!parent.childNodes[1]) {
                    const spanEvent = Basic.create("span", "_calendar-print-event-label")
                    spanEvent.innerText = `${arr[event.date]}`
                    parent.appendChild(spanEvent)
                }

            }
        })

    }
    getEvents() {
        if (typeof this.#url !== "undefined") {
            if (typeof this.#bearerToken !== "undefined") {
                Basic.fetch(`${this.#url}?date=${Basic.date.getYearMonth()}`)
                    .then(res => { this.printEvents(res) })
                    .catch(err => { console.log(err) })
            } else {
                Basic.authFetch(`${this.#url}?date=${Basic.date.getYearMonth()}`, this.#bearerToken)
                    .then(res => { this.printEvents(res) })
                    .catch(err => { console.log(err) })
            }
        }
    }
    updateCalendar() {
        Basic.wipeEvents(document.querySelectorAll("._btn_e_0"), "click", this.#handlerClick)
        const currentMonth = document.querySelector("._cm_u_")
        const currentYear = document.querySelector("._cy_u_")
        const monthFillable = document.querySelector("._cmd_u_")
        currentMonth.innerText = Basic.date.getStringMonth(Basic.date.date.getMonth(), this.#lang)
        currentYear.innerText = Basic.date.date.getFullYear().toString()
        monthFillable.innerHTML = null
        monthFillable.appendChild(this.fillCalendar())
        this.getEvents()
    }
    /**
     * 
     * @param {HTMLDivElement} container 
     */
    renderCalendar(container) {
        container.setAttribute("style", "min-height:fit-content !important")
        this.#createStructure()
        container.appendChild(this.#structure)
        this.resize()
        this.resizeEvent(container)
        this.getEvents()

    }
}