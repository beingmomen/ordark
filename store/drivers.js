export const state = () => ({
  currentPage: "",
  totalPages: "",
  activeCityId: 0, // all
  activeAreaId: 0, // all
  driversData: [],
  driversSearch: "",

  loadedOrders: [],
  searchOrdersText: "",
  currentOrdersPage: 1,
  totalOrdersPages: 1,
  selectedDateType: "today",
});

export const getters = {
  getActiveCityId(state) {
    return state.activeCityId;
  },
  getActiveAreaId(state) {
    return state.activeAreaId;
  },

  getCurrentPage(state) {
    return state.currentPage;
  },
  getTotalPages(state) {
    return state.totalPages;
  },
  getDriversData(state) {
    return state.driversData;
  },
  getSearchText(state) {
    return state.driversSearch;
  },

  getSearchOrdersText(state) {
    return state.searchOrdersText;
  },
  
};

export const actions = {
  loadDriversData({ commit, getters }, page) {
    this.$axios
      .get(
        `/drivers?page=${page}&search=${getters.getSearchText}&city_id=${getters.getActiveCityId}&area_id=${getters.getActiveAreaId}`
      )
      .then((res) => {
        commit("loadDriversData", res.data.data.data);
        commit("changeTotalPages", res.data.data.last_page);
        commit("changeCurrentPage", res.data.data.current_page);
      });
  },

};
export const mutations = {
  updateActiveCity(state, id) {
    state.activeCityId = id;
  },
  updateActiveArea(state, id) {
    state.activeAreaId = id;
  },
  changeCurrentPage(state, value) {
    state.currentPage = value;
  },

  changeTotalPages(state, value) {
    state.totalPages = value;
  },
  updateDriversSearch(state, value) {
    state.driversSearch = value;
  },
  loadDriversData(state, value) {
    // console.warn("loadDriversData: ", value);
    state.driversData = value;
  },

};
