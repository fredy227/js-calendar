import {MakeCalendar} from "./class.js"
import Basic from "../basic.js"
export class Calendar{
    #makeCalendar
    /**
     * @param {String} url 
     * Url string
     * Method GET
     * Example http://example.com/events
     * 
     * @param {Function} handlerClick callback function
     * @param {String} lang Values 'en'  or 'es' [english, espanish]
     * @param {String} bearerToken Bearer Token
     */
    constructor(handlerClick,lang,url,bearerToken) {
        if(!url) throw new Error("You must provide an url")
        if(!handlerClick) throw new Error("You must provide a handler function")
        this.#makeCalendar = new MakeCalendar(handlerClick,lang,url,bearerToken)
    }
    /**
     * 
     * @param {HTMLDivElement} container 
     */
    render(container){
        if(container.constructor.name === "HTMLDivElement"){
            this.#makeCalendar.renderCalendar(container)
        }else{
            Basic.error("The container parameter must be an HTMLDivElement")
        }
        // container.innerHTML=null
    }
}