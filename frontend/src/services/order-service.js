import { storageService } from "./storage-service.js"
import { httpService } from "./http.service.js"
export const orderService = {
  query,
  getById,
  addOrder,
}


const DB_KEY = "orderDB"
_createOrders()

async function query(){
    var orders = await httpService.get(`order`)
    return orders
}

async function addOrder(order){
    var newOrder;
    // console.log(order);
    if(!order._id){ 
      newOrder = httpService.post( `order`, order)
    }
    else{
      newOrder = httpService.put( `order`, order)
    } 
    return newOrder
}

async function getById(orederId) {
    try {
      var stay = await storageService.get(DB_KEY, orederId)
      return stay
    } catch (error) {
      console.log(error)
    }
  }
  
  async function _createOrders() {
    var orders = JSON.parse(localStorage.getItem(DB_KEY))
    if (!orders || !orders.length) {
      orders = _createOrder()
    //   console.log(orders)
      localStorage.setItem(DB_KEY, JSON.stringify(orders))
    }
  }

  function _createOrder(){
    var orders =  [
        {
          "_id": "o1225",
          "hostId": "u102",
          "createdAt": 9898989,
          "buyer": {
            "_id": "u101",
            "fullname": "User 1"
          },
          "totalPrice": 160,
          "startDate": "2025/10/15",
          "endDate": "2025/10/17",
          "guests": {
            "adults": 2,
            "kids": 1
          },
          "stay": {
            "_id": "h102",
            "name": "House Of Uncle My",
            "price": 80
          },
          "status": "Pending"
        },    
        {
          "_id": "o1337",
          "hostId": "u103",
          "createdAt": 9898989,
          "buyer": {
            "_id": "u105",
            "fullname": "User 3"
          },
          "totalPrice": 100,
          "startDate": "2025/10/15",
          "endDate": "2025/10/17",
          "guests": {
            "adults": 2,
            "kids": 4
          },
          "stay": {
            "_id": "fssd233",
            "name": "House Of king obama",
            "price": 20
          },
          "status": "Pending"
        },    
        {
          "_id": "oShit121",
          "hostId": "u120",
          "createdAt": 9898989,
          "buyer": {
            "_id": "u101",
            "fullname": "User 5"
          },
          "totalPrice": 300,
          "startDate": "2025/10/15",
          "endDate": "2025/10/17",
          "guests": {
            "adults": 2,
            "kids": 1
          },
          "stay": {
            "_id": "h200",
            "name": "House Of fun",
            "price": 100
          },
          "status": "Pending"
        },    
      ]
      return orders
  }