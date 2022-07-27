import { stayService } from '../../services/stay-service.js'
export const stay = {
  state: {
    stays: null,
    filterBy: null,
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
      // console.log(state.stays)
    },
    updateStay(state, {newStay}){
      const idx = state.stays.findIndex((currStay) => currStay._id === newStay._id);
      if (idx !== -1) {
        state.stays.splice(idx, 1, {...newStay});
      } else {
        console.log("not good shit");
      }
   }
  },
  actions: {
    async loadStays({ commit }) {
      try {
        var stays = await stayService.query(this.filterBy)
        // console.log("here", stays)
        commit({ type: 'setStays', stays })
      } catch (err) {
        console.log('couldnt load stays', err)
      }
    },
    async setFilter(state, { filterBy }) {
      state.filterBy = filterBy
      try {
        var stays = await stayService.query(filterBy)
        state.commit({ type: 'setStays', stays })
      } catch (err) {
        console.log(err)
      }
    },
    async updateStay({commit},{stay}){
      stay.isLiked = !stay.isLiked
      console.log(stay);
      try{
          var newStay = await stayService.updateStay({...stay})
          commit({type:'updateStay', newStay})
      }
      catch(err){
          console.log("couldnt update stay", err);
      }
  }
  },
  getters: {
    staysForDisplay({ stays }) {
      return stays
    },
  },
}
