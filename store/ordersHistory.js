export const state = () => ({
  activeCardId: 1,
});

export const getters = {
  getActiveCardId(state) {
    return state.activeCardId;
  },
};

export const mutations = {
  updateActiveCard(state, id) {
    state.activeCardId = id;
  },
};
