export const state = () => ({
  currentPage: "",
  totalPages: "",
  activeCityId: 0, // all
  activeAreaId: 0, // all
  adminsData: [],
  adminsSearch: "",
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
  getAdminsData(state) {
    return state.adminsData;
  },
  getSearchText(state) {
    return state.adminsSearch;
  },
};

export const actions = {
  loadAdminsData({ commit, getters }, page) {
    this.$axios
      .get(`/admins?page=${page}&search=${getters.getSearchText}&city_id=${getters.getActiveCityId}&area_id=${getters.getActiveAreaId}`)
      .then((res) => {
        // console.warn("admin response :::::", res);
        commit("loadAdminsData", res.data.data.data);
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
  updateAdminsSearch(state, value) {
    state.adminsSearch = value;
  },
  loadAdminsData(state, value) {
    // console.warn("loadAdminsData: ", value);
    state.adminsData = value;
  },
};
