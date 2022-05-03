export const state = () => ({
  dateList: [
    {
      key: "today",
      text: "اليوم",
    },
    {
      key: "week",
      text: "هذا الأسبوع",
    },
    {
      key: "month",
      text: "هذا الشهر",
    },
    {
      key: "year",
      text: "هذا العام",
    },
    {
      key: "all",
      text: "منذ البداية",
    },
  ],
  loadedOrders: [],
  activeCardId: 1,
  activeCityId: 0, // all
  activeAreaId: 0, // all
  activeStatusId: 0, // all
  searchText: "",
  currentPage: 1,
  totalPages: 1,
  selectedDateType: "today",
});

export const getters = {
  getOrdersDateList(state) {
    return state.dateList;
  },
  getSelectedDateType(state) {
    return state.selectedDateType;
  },
  getActiveCardId(state) {
    return state.activeCardId;
  },
  getActiveCityId(state) {
    return state.activeCityId;
  },
  getActiveAreaId(state) {
    return state.activeAreaId;
  },
  getActiveStatusId(state) {
    return state.activeStatusId;
  },
  getSearchText(state) {
    return state.searchText;
  },
  getLoadedOrders(state) {
    return state.loadedOrders;
  },
  getTotalPages(state) {
    return state.totalPages;
  },
  getCurrentPage(state) {
    return state.currentPage;
  },
};

export const actions = {
  loadOrders({ commit, getters,rootGetters }, page) {
    this.$axios
      .get(
        `/orders?page=${page}&city_id=${getters.getActiveCityId}&area_id=${getters.getActiveAreaId}&status_id=${getters.getActiveStatusId}&search=${getters.getSearchText}&date=${getters.getSelectedDateType}`
      )
      .then((res) => {
        console.log("res: ", res);
        // console.warn("orders res from store ::::", res);
        commit("updateLoadedOrders", res.data.data.data);
        commit("updateTotalPages", res.data.data.last_page);
        commit("updateCurrentPage", res.data.data.current_page);
      });
  },
};

export const mutations = {
  updateSelectedDateType(state, value) {
    state.selectedDateType = value;
  },
  updateLoadedOrders(state, value) {
    state.loadedOrders = value;
  },
  updateTotalPages(state, value) {
    state.totalPages = value;
  },
  updateCurrentPage(state, value) {
    state.currentPage = value;
  },
  updateActiveCard(state, id) {
    state.activeCardId = id;
  },
  updateActiveCity(state, id) {
    state.activeCityId = id;
  },
  updateActiveArea(state, id) {
    state.activeAreaId = id;
  },
  updateSearchText(state, text) {
    state.searchText = text;
  },
  updateActiveStatus(state, id) {
    // console.warn("updateActiveStatus: ", id);
    state.activeStatusId = id;
  },
};
