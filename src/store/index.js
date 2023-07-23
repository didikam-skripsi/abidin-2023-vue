import { createStore } from "vuex";
import authStore from './modules/auth'

export const store = createStore({
  modules: {
    authStore,
  },
});
