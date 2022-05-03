export const state = () => ({
  currentPage: "",
  totalPages: "",
  activeCity: 0,
  areasData: [],
  areasSearch: "",
});

export const getters = {
  getCurrentPage(state) {
    return state.currentPage;
  },
  getTotalPages(state) {
    return state.totalPages;
  },
  getAreasData(state) {
    return state.areasData;
  },
  getActiveCity(state) {
    return state.activeCity;
  },
  getSearchText(state) {
    return state.areasSearch;
  },
};

export const actions = {
  loadAreasData({ commit, getters }, page) {
    this.$axios
      .get(`/areas?page=${page}&search=${getters.getSearchText}&city_id=${getters.getActiveCity}`)
      .then((res) => {
        commit("loadAreasData", res.data.data.data);
        commit("changeTotalPages", res.data.data.last_page);
        commit("changeCurrentPage", res.data.data.current_page);
      });
  },
};
export const mutations = {
  changeCurrentPage(state, value) {
    state.currentPage = value;
  },

  changeTotalPages(state, value) {
    state.totalPages = value;
  },
  updateAreasSearch(state, value) {
    state.areasSearch = value;
  },
  updateActiveCity(state, value) {
    state.activeCity = value;
  },
  loadAreasData(state, value) {
    // console.warn("loadAreasData: ", value);
    state.areasData = value;
  },
};
