export const state = () => ({
  currentPage: "",
  totalPages: "",

  statusData: [],
  statusSearch: "",
});

export const getters = {
  getCurrentPage(state) {
    return state.currentPage;
  },
  getTotalPages(state) {
    return state.totalPages;
  },
  getStatusesData(state) {
    return state.statusData;
  },
  getSearchText(state) {
    return state.statusSearch;
  },
};

export const actions = {
  loadStatusesData({ commit, getters }, page) {
    return this.$axios
      .get(`/order_status?page=${page}&search=${getters.getSearchText}`)
      .then((res) => {
        commit("loadStatusesData", res.data.data.data);

        commit("changeTotalPages", res.data.data.last_page);
        commit("changeCurrentPage", res.data.data.current_page);
      });
  },
  setOrderStatusProgress({ commit }, id) {

  }
};
export const mutations = {
  changeCurrentPage(state, value) {
    state.currentPage = value;
  },

  changeTotalPages(state, value) {
    state.totalPages = value;
  },
  updateStatusSearch(state, value) {
    state.statusSearch = value;
  },
  loadStatusesData(state, value) {
    // console.warn("loadStatusesData: ", value);
    state.statusData = value;
  },
};
