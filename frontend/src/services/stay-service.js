import { storageService } from "./storage-service.js"
// const stays = require('../../data/stay.json')
export const stayService = {
  query,
  getById,
  getRandomInt,
}

const DB_KEY = "stayDB"
_createStays()

async function query(filterBy = null) {
  var stays = await storageService.query(DB_KEY)
  if (!filterBy) return stays

  var filteredStays = stays

  //filter by amenities
  if (filterBy.amenities && filterBy.amenities.length) {
    filteredStays = filteredStays.filter((stay) => {
      return filterBy.amenities.every((amn) => {
        return stay.amenities.includes(amn)
      })
    })
  }
  //filter by bathroom
  if (filterBy.bathrooms && filterBy.bathrooms.length){
      filteredStays = filteredStays.filter((stay)=>stay.bathrooms === filterBy.bathrooms[0])
  } 

  //filter by bedrooms
  if (filterBy.bedrooms && filterBy.bedrooms.length){
      filteredStays = filteredStays.filter((stay)=>stay.bedrooms === filterBy.bedrooms[0])
  } 

  //filter by beds
  if (filterBy.beds && filterBy.beds.length){
      filteredStays = filteredStays.filter((stay)=>stay.beds === filterBy.beds[0])
  } 

  //filter by property type
  if(filterBy.propertyType && filterBy.propertyType.length){
    filteredStays = filteredStays.filter((stay)=>{
        return filterBy.propertyType.includes(stay.propertyType)
    })
  }

  //filter by room type
  if(filterBy.roomType && filterBy.roomType.length){
    filteredStays = filteredStays.filter((stay)=>{
       return filterBy.roomType.find((element)=>{
            return stay.roomType.includes(element)
       })
    })
  }

//filter by superHost
if(filterBy.superHost) filteredStays = filteredStays.filter((stay)=> stay.host.isSuperhost)

//filter by price
if(filterBy.priceRange && filterBy.priceRange.length === 2){
    filteredStays = filteredStays.filter((stay)=> stay.price >= filterBy.priceRange[0] && stay.price <= filterBy.priceRange[1])
} 

  return filteredStays
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
    stays = await (await fetch("../../data/stay.json")).json()
    stays = stays.splice(0, 30)
    console.log(stays)
    localStorage.setItem(DB_KEY, JSON.stringify(stays))
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
