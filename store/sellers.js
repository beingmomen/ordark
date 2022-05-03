export const state = () => ({
  currentPage: "",
  totalPages: "",
  activeCityId: 0, // all
  activeAreaId: 0, // all
  sellersData: [],
  sellersSearch: "",

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
  getSellersData(state) {
    return state.sellersData;
  },
  getSearchText(state) {
    return state.sellersSearch;
  },

  getSearchOrdersText(state) {
    return state.searchOrdersText;
  },
  
};

export const actions = {
  loadSellersData({ commit, getters }, page) {
    this.$axios
      .get(
        `/sellers?page=${page}&search=${getters.getSearchText}&city_id=${getters.getActiveCityId}&area_id=${getters.getActiveAreaId}`
      )
      .then((res) => {
        commit("loadSellersData", res.data.data.data);
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
  updateSellersSearch(state, value) {
    state.sellersSearch = value;
  },
  loadSellersData(state, value) {
    // console.warn("loadSellersData: ", value);
    state.sellersData = value;
  },

};
