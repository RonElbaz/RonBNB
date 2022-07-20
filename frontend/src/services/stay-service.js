import { storageService } from "./storage-service.js"
// const stays = require('../../data/stay.json')
export const stayService = {
    query,
    getById,
}

const DB_KEY = "stayDB"
_createStays()

async function query(filterBy = null){
    // if(!filterBy) return {key:"onsucS"}

    // var stays = await (await fetch('../../data/stay.json')).json()
    // console.log(stays.splice(0,10))
    // return stays

    return storageService.query(DB_KEY)
}

async function getById(stayId){
    return storageService.getById(stayId)
}

async function _createStays(){
    var stays = JSON.parse(localStorage.getItem(DB_KEY))
    if(!stays || !stays.length){
        stays =  await (await fetch('../../data/stay.json')).json()
        stays = stays.splice(0,10)
        console.log(stays)
        localStorage.setItem(DB_KEY,JSON.stringify(stays))
    }
}