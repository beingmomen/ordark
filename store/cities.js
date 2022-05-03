export const state = () => ({
    currentPage: "",
    totalPages: "",
  
    citiesData: [],
    citiesSearch: "",
  });
  
  export const getters = {
    getCurrentPage(state) {
      return state.currentPage;
    },
    getTotalPages(state) {
      return state.totalPages;
    },
    getCitiesData(state) {
      return state.citiesData;
    },
    getSearchText(state) {
      return state.citiesSearch;
    },
  };
  
  export const actions = {
    loadCitiesData({ commit, getters }, page) {
      this.$axios
        .get(`/cities?page=${page}&search=${getters.getSearchText}`)
        .then((res) => {
          commit("loadCitiesData", res.data.data.data);
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
    updateCitiesSearch(state, value) {
      state.citiesSearch = value;
    },
    loadCitiesData(state, value) {
      // console.warn("loadCitiesData: ", value);
      state.citiesData = value;
    },
  };
  