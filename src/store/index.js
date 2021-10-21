import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    // User
    userName: null,
    userEmail: null,
    userAvatar: null,

    // hide header and sidebar if true
    isFormScreen: false,

    // sidebar
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    // data
    filter: "",
    filteredUser: "",
    users: [],
    categories: [],
    category: [],
    categoryId: "",
    items: [],

    // form model
    form: {
      user: "",
      password: "",
      passwordRepeat: "",
      remember: false,
      forgotPassword: ""
    },

    // search model
    searchModel: {
      user: "",
      categories: "",
      items: "",
      invoices: ""
    }
  },

  mutations: {
    // all commit
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

    async login({}, payload = null) {
      await axios({
        method: "POST",
        url: "http://35.188.119.8/cloud-menu/api/v1/web/user/login",
        // withCredentials: true,
        // crossdomain: true,
        data: {
          email: payload.username,
          password: payload.pass
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
          // "Access-Control-Allow-Methods":
          //   "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, Content-Type"
        }
      })
        .then(res => {
          // console.log(res.data.data);
          if (res.status == 200)
            localStorage.setItem("token", res.data.data.token);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchUsers({ commit }) {
      axios
        .get("data-sources/restaurants.json")
        .then(r => {
          if (r.data) {
            if (r.data.data) {
              commit("basic", {
                key: "users",
                value: r.data.data
              });
            }
          }
        })
        .catch(error => {
          alert(error.message);
        });
    },
    fetchItems({ commit }, catId = null) {
      axios
        .get("http://35.188.119.8/cloud-menu/api/v1/web/item/" + catId, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(r => {
          console.log(r.data);
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
    filterUsersById({ commit, state }, userId = null) {
      if (state.users.length) {
        const filterById = state.users.filter(filtered => {
          return filtered.id == userId;
        });

        commit("basic", {
          key: "filteredUser",
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
    },
    fetchCategories({ commit }) {
      axios
        .get("http://35.188.119.8/cloud-menu/api/v1/web/category", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(r => {
          console.log(r.data);
          if (r.data) {
            commit("basic", {
              key: "categories",
              value: r.data.data.categories
            });
          }
        });
    },
    // filterCategories({ commit, state }) {
    //   const filtered = state.categories.filter(element => {
    //     return element.name
    //       .toUpperCase()
    //       .includes(state.searchModel.categories.toUpperCase());
    //   });

    //   commit("basic", {
    //     key: "filteredCategories",
    //     value: filtered
    //   });
    // },
    filterCategoryById({ commit, state }, catId = null) {
      if (catId !== null) {
        if (state.categories.length) {
          const filter = state.categories.filter(f => {
            return f.id === catId;
          });

          commit("basic", {
            key: "category",
            value: filter
          });
        }
      }
    }
  },
  modules: {}
});
