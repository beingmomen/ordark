export const state = () => ({
  currentPage: "",
  dashboardData: [],
  citiesList: [],
  areasList: [],
  statusesList: [],
  driversList: [],
  statusesDataArray: [],
  statusSearch: "",
});

export const getters = {
  getDashboardData(state) {
    return state.dashboardData;
  },

  getCurrentPageName(state) {
    return state.currentPage;
  },
  getCitiesList(state) {
    return state.citiesList;
  },

  getAreasList(state) {
    return state.areasList;
  },

  getStatusesList(state) {
    return state.statusesList;
  },

  getDriversList(state) {
    return state.driversList;
  },

  getStatusesData(state) {
    return state.statusesDataArray;
  },
  getStatusesSearch(state) {
    return state.statusSearch;
  },
};

export const actions = {
  loadDashboardData({ commit }) {
    this.$axios.get(`/dashboard`).then((res) => {
      commit("updateDashboardData", res.data.data);
    });
  },

  loadStatusesData({ commit, getters }, page) {
    // ?page=${page}&search=${getters.getStatusesSearch}
    this.$axios.get(`/order_status?page=${page}`).then((res) => {
      commit("loadStatusesData", res.data.data.data);
    });
  },

  loadCitiesList({ commit }) {
    this.$axios.get("/cities/list").then((res) => {
      // console.warn("cities list: ", res.data);
      commit("loadCitiesList", res.data.data);
    });
  },
  loadAreasList({ commit }) {
    this.$axios.get("/areas/list").then((res) => {
      // console.warn("areas list: ", res.data);
      commit("loadAreasList", res.data.data);
    });
  },
  loadDriversList({ commit }) {
    this.$axios.get(`/drivers/list`).then((res) => {
      // console.warn("order_statuses list: ", res.data);
      commit("loadDriversList", res.data.data);
    });
  },
  loadStatusList({ commit, rootGetters }) {
    // `/orders?page=${page}&city_id=${cityId}&area_id=${areaId}&search=${getters.getSearchText}`

    // console.warn("rootState: ", rootGetters);
    let selectedDate = rootGetters["orders/getSelectedDateType"];

    let cityId = rootGetters["orders/getActiveCityId"];
    let areaId = rootGetters["orders/getActiveAreaId"];
    let searchText = rootGetters["orders/getSearchText"];

    this.$axios
      .get(
        `/order_status/list?date=${selectedDate}&city_id=${cityId}&area_id=${areaId}&search=${searchText}`
      )
      .then((res) => {
        // console.warn("order_statuses list: ", res.data);
        commit("loadStatusesList", res.data.data);
      });
  },

 
};

export const mutations = {
  changeCurrentPage(state, pageName) {
    state.currentPage = pageName;
  },
  loadCitiesList(state, value) {
    let list = value;
    list.unshift({ id: 0, name: "الكل" });
    state.citiesList = value;
  },

  loadAreasList(state, value) {
    let list = value;
    list.unshift({ id: 0, name: "الكل" , formattedName: "الكل" });
    value.forEach(item=> item.formattedName = item.name + ` (${item.shipping_cost} ج.م) `)
    state.areasList = value;
  },

  loadStatusesList(state, value) {
    let list = value;
    let counter = 0;
    let money = 0;
    for (let i = 0; i < value.length; i++) {
      counter += value[i].value;
      money += value[i].shipping_cost;
    }
    list.unshift({
      id: 0,
      name: " الكل",
      value: counter,
      shipping_cost: money,
    });
    state.statusesList = value;
  },
  loadDriversList(state, value) {
    let list = value;
    let counter = 0;
    let money = 0;
    for (let i = 0; i < value.length; i++) {
      counter += value[i].value;
      money += value[i].shipping_cost;
    }
    list.unshift({
      id: 0,
      name: " الكل",
      value: counter,
      shipping_cost: money,
    });
    state.driversList = value;
  },
  loadStatusesData(state, value) {
    // console.warn("loadStatusesData: ", value);
    state.statusesDataArray = value;
  },

  updateDashboardData(state, value) {
    // console.warn("updateDashboardData: ", value);
    state.dashboardData = value;
  },
};
