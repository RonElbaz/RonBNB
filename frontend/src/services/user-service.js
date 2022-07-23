

export const userService = {
    getLoggedInUser,
}

async function getLoggedInUser() {
    const user =  {
        _id: "leet1337user",
        fullname:"Ligma Balls"
    }
    return user
  }