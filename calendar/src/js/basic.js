class _Date {
    static date = new Date()
    static nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1)
        this.date.setDate(1)
    }
    static prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1)
        this.date.setDate(1)

    }
    static firstDay() {
        return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay() + 1
    }
    static countDays() {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    }
    static getStringDate = (date, lan = "es-ES") => {
        const currentDate = new Date(date);
        const refactoryDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds())
        const result = refactoryDate.toLocaleString(lan, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        return result
    }
    static getDateFormat(iterator) {
        return `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toString().padStart(2, "0")}-${(iterator.toString()).padStart(2, "0")}`
    }
    static getYearMonth(iterator) {
        return `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toString().padStart(2, "0")}`
    }
    /**
     * 
     * @param {String} lang "en or es language"
     */
    static getStringMonth(month, lang = "en") {
        const esMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        const enMonths = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return lang == 'es' ? esMonths[month] : enMonths[month]
    }
    static daysArray(lang = "en") {
        if (lang == "en" || lang != "es") return ["Sun", "Mon", "tue", "Wed", "Thu", "Fri", "Sat"]
        if (lang == "es") return ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
    }
}
export default class Basic {
    static date = _Date

    static error(message) {
        throw new Error(message)
    }
    static typeOf(any) {
        return any.constructor.name
    }
    static async authFetch(url,token) {
        return await fetch(url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json()
        .then(json => json))
        .catch(err =>{console.log(err)})
    }
    static async fetch(url) {
            return await fetch(url, {
                method: "GET"
            }).then(response =>response.json()
            .then(json => json))
            .catch(err =>{console.log(err)})
    }
    /**
     * 
     * @returns {HTMLElement} 
     */
    static create(tagName, className = "") {
        const element = document.createElement(tagName)
        if (className === "") {
            return element
        } else {
            className = className.split(" ")
            className.forEach(name => {
                element.classList.add(name)
            });
            return element
        }
    }

    /**
     * 
     * @param {NodeListOf<HTMLElement>} elements 
     * @param {string} eventType 
     * @param {Function} func 
     */
    static wipeEvents(elements, eventType, func) {
        if (typeof func !== "function") throw new Error("parameter func is not a function")
        if (typeof eventType !== "string") throw new Error("parameter eventType must be a string")
        if (typeof elements === "object") {
            elements.forEach(element => {
                element.removeEventListener(eventType, func)
            })
        }
    }

}
