import { userService } from '../../services/user-service.js'
export const user = {
    state: {
        user : null,
    },
    mutations: {
     setUser(state, {user}){
        state.user = user
     },
    },
    actions:{
        async loadUser({commit}){
            try{
                var user = await userService.getLoggedInUser()
                // console.log("here", user)
                commit({type:'setUser', user})
            }
            catch(err){
                console.log("couldnt load user", err)
            }
        },
    },
    getters: {
        getLoggedInUser({user}){
            return user
        }
    }
  }