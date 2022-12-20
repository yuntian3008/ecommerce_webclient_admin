export const state = () => ({
  isRequestLoading: {
    url: null,
    method: null,
    state: false,
  }
})

export const mutations = {
  saveLoadingStatus(state, payload) {
    state.isRequestLoading = payload
  }
}

export const actions = {
  setLoadingStatus({ commit }, status) {

    commit('saveLoadingStatus', status)
  }
}
