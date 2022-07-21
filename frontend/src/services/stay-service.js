import { storageService } from "./storage-service.js"
// const stays = require('../../data/stay.json')
export const stayService = {
    query,
    getById,
    getRandomInt
}

const DB_KEY = "stayDB"
_createStays()

async function query(filterBy = null) {
    // if(!filterBy) return {key:"onsucS"}

    // var stays = await (await fetch('../../data/stay.json')).json()
    // console.log(stays.splice(0,10))
    // return stays

    return storageService.query(DB_KEY)
}

async function getById(stayId) {
    try {
        var stay = await storageService.get(DB_KEY, stayId)
        return stay

    } catch (error) {
        console.log(error)
    }

}

async function _createStays() {
    var stays = JSON.parse(localStorage.getItem(DB_KEY))
    if (!stays || !stays.length) {
        stays = await (await fetch('../../data/stay.json')).json()
        stays = stays.splice(0, 10)
        console.log(stays)
        localStorage.setItem(DB_KEY, JSON.stringify(stays))
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min 
  }