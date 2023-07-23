import { getAuthUser, getToken } from "@/utils/auth";

const state = {
  token: getToken,
};

const mutations = {
  mutationAuth(state, token) {
    state.token = token;
  },
};

const actions = {
  async setAuth({ commit }, token) {
    localStorage.setItem("gostarter_token", token);
    commit("mutationAuth", token);
  },
};

const getters = {
  getUser: () => {
    return getAuthUser();
  },
  getToken: (state) => {
    return state.token;
  },
  getMyPermission: (state) => {
    if (state.user && state.user != "null") {
      if (!JSON.parse(JSON.parse(state.user)).access) {
        return [];
      }
      return JSON.parse(JSON.parse(state.user)).access.split("|");
    }
    return [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
