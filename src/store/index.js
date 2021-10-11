import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* FormScreen - fullscreen form layout (e.g. login page) */
    isFormScreen: false,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    /* Sample data (commonly used) */
    search: "",
    filter: "",
    filtered: "",
    clients: [],
    categories: [],
    items: [],

    form: {
      user: "",
      password: "",
      passwordRepeat: "",
      remember: true,
      forgotPassword: ""
    },

    searchModel: {
      user: "",
      categories: "",
      items: ""
    },

    // modal
    forgotPasswordModal: true
  },
  mutations: {
    /* A fit-them-all commit */
    basic(state, payload) {
      state[payload.key] = payload.value;
    },

    /* User */
    user(state, payload) {
      if (payload.name) {
        state.userName = payload.name;
      }
      if (payload.email) {
        state.userEmail = payload.email;
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar;
      }
    }
  },
  actions: {
    asideMobileToggle({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded;

      document
        .getElementById("app")
        .classList[isShow ? "add" : "remove"]("ml-60");

      document.documentElement.classList[isShow ? "add" : "remove"](
        "m-clipped"
      );

      commit("basic", {
        key: "isAsideMobileExpanded",
        value: isShow
      });
    },
    asideLgToggle({ commit, state }, payload = null) {
      commit("basic", {
        key: "isAsideLgActive",
        value: payload !== null ? payload : !state.isAsideLgActive
      });
    },
    formScreenToggle({ commit, state }, value) {
      commit("basic", { key: "isFormScreen", value });

      document.documentElement.classList[value ? "add" : "remove"](
        "form-screen"
      );
    },
    fetchClients({ commit }) {
      axios
        .get("data-sources/restaurants.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "clients",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchItems({ commit }) {
      axios.get("data-sources/items.json").then(r => {
        if (r.data) {
          if (r.data.data) {
            commit("basic", {
              key: "items",
              value: r.data.data
            });
          }
        }
      });
    },
    filterClientsById({ commit, state }, userId = null) {
      if (state.clients.length) {
        const filterById = state.clients.filter(filtered => {
          return filtered.id == userId;
        });
        

        commit("basic", {
          key: "filtered",
          value: filterById
        });
        //   console.log(filtered.id == userId);

        //   return (
        //     filtered.user
        //       .toUpperCase()
        //       .includes(state.searchModel.user.toUpperCase()) ||
        //     filtered.restaurant
        //       .toUpperCase()
        //       .includes(state.searchModel.user.toUpperCase()) ||
        //     filtered.country
        //       .toUpperCase()
        //       .includes(state.searchModel.user.toUpperCase())
        //   );
        // });

        // const filter = filterBySearch.filter(filtered => {
        //   return filtered.status
        //     .toUpperCase()
        //     .includes(state.filter.toUpperCase());
        // });

        // console.log(filter);
        // commit("basic", {
        //   key: "filtered",
        //   value: filter
        // });
      } else {
        return null;
      }
    }
  },
  modules: {}
});
