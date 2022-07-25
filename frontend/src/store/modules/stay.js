import { stayService } from '../../services/stay-service.js'
export const stay = {
  state: {
    stays: null,
    filterBy: null,
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
      console.log(state.stays)
    },
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
  },
  getters: {
    staysForDisplay({ stays }) {
      return stays
    },
  },
}
