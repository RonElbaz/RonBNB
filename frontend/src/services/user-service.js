

export const userService = {
    getLoggedInUser,
}

async function getLoggedInUser() {
    const user =  {
        _id: "leet1337user",
        fullname:"James Richardson"
    }
    return user
  }