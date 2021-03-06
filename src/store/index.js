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
    isAsideMobileExpanded: true,
    isAsideLgActive: false,

    // data
    filter: "",
    filteredUser: "",
    users: [],
    user: "",
    allCategories: [],
    categories: [],
    category: [],
    categoryId: "",
    items: [],
    activeUserCount: "",
    bannedUserCount: "",

    // form model
    form: {
      user: "",
      password: "",
      passwordRepeat: "",
      remember: false,
      forgotPassword: ""
    },

    loading: false,
    loadingMessage: "",
    isSkeleton: {
      category: true
    },
    isDeleted: {
      category: false,
      item: false
    },

    // search model
    searchModel: {
      user: "",
      categories: "",
      items: "",
      invoices: ""
    },
    login: {
      isAuth: false,
      message: ""
    },

    isEmailSent: false,
    resetPassErrorMessage: "",
    isSuccessChangeUserStatus: false,

    notification: "",
    isPasswordChanged: false,
    base_url: "https://cloudmenu-backend.fusionsgeek.com/api/v1/admin/",
    base_url_image: "https://cloudmenu-backend.fusionsgeek.com/images/",
    end_point: {}
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

    // component
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
    formScreenToggle({ commit }, value) {
      commit("basic", { key: "isFormScreen", value });
      document.documentElement.classList[value ? "add" : "remove"](
        "form-screen"
      );
    },

    // form

    async login({ state }, payload = null) {
      state.loading = true;
      state.loadingMessage = "Logging you in...";

      await axios({
        method: "POST",
        url: state.base_url + "login",
        // url: state.base_url + "register",
        data: {
          username: payload.username,
          password: payload.pass
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.status == "Success") {

            sessionStorage.setItem("token", res.data.data.token);
            state.login.isAuth = true
            setTimeout(() => {
              state.loading = false;
            }, 2000);
          }
        })
        .catch(err => {
          state.loading = false;
          // if (err.response.status == 401) {
          state.login.message = err.response.data.message
          // }
        });
    },
    async changePassword({ commit, state }, payload = null) {
      await axios({
        url: state.base_url + "changepass",
        method: "POST",
        data: {
          old_password: payload.oldPassword,
          new_password: payload.newPassword
        },
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
        .then(r => {
          if (r.data.status == "Success") {
            commit("basic", {
              key: "isPasswordChanged",
              value: true
            });
          } else {
            commit("basic", {
              key: "isPasswordChanged",
              value: false
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          commit("basic", {
            key: "isPasswordChanged",
            value: false
          });
        });
    },
    async forgotPassword({ commit, state }, payload = null) {
      await axios({
        url: state.base_url + "forgotpass",
        method: "POST",
        data: {
          username: payload
        },
        // headers: {
        //   Authorization: sessionStorage.getItem("token")
        // }
      })
        .then(r => {
          if (r.data.status == "Success")
            commit('basic', {
              key: 'isEmailSent',
              value: true
            })
        })
        .catch(err => {
          state.resetPassErrorMessage = err.response.data.message
        });
    },

    async resetPassword({ commit, state }, payload = null) {
      if (payload !== null) {

        await axios({
          url: state.base_url + "resetPassword",
          method: "POST",
          data: {
            id: payload.id,
            password: payload.newPassword
          }
          // headers: {
          //   Authorization: sessionStorage.getItem("token")
          // }
        })
          .then(r => {
            console.log(r.data);
            if (r.data.status == "Success") {
              commit("basic", {
                key: "isPasswordChanged",
                value: true
              });
            } else {
              commit("basic", {
                key: "isPasswordChanged",
                value: false
              });
            }
          })
          .catch(err => {
            console.log("err", err);
            commit("basic", {
              key: "isPasswordChanged",
              value: false
            });
          });
      }
    },

    //user 

    async changeUserStatus({ state }, uid = null) {
      console.log(uid);
      if (uid !== null) {
        await axios({
          url: state.base_url + "changeUserStatus",
          method: "PUT",
          headers: {
            Authorization: sessionStorage.getItem("token")
          },
          data: {
            id: uid
          }
        }).then(r => {
          // if (r.data.statuscode == 0) {
          console.log(r.data);
          state.isSuccessChangeUserStatus = true
          // }
        }).catch(err => {
          console.log(err.response);
          state.isSuccessChangeUserStatus = false
        });
      }
    },
    async fetchUserById({ commit, state }, uid = null) {
      await axios({
        url: state.base_url + "user/" + uid,
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      }).then(r => {
        commit("basic", {
          key: "user",
          value: r.data.data.detail
        });
        commit("basic", {
          key: "allCategories",
          value: r.data.data.categories
        });
      }).catch(err => {
        console.log(err);
      });
    },

    async filterUsersById({ commit, state }, userId = null) {
      if (sessionStorage.getItem("users")) {
        const filterById = state.users.filter(filtered => {
          return filtered.uid == userId;
        });

        commit("basic", {
          key: "filteredUser",
          value: filterById
        });
      } else {
        return null;
      }
    },

    //categories
    async fetchCategories({ commit, state }, userId = null) {
      state.isSkeleton.category = true;
      await axios
        .get(state.base_url + "items/user/" + userId, {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
        .then(r => {
          if (r.data) {
            commit("basic", {
              key: "categories",
              value: r.data.data.categories
            });
            state.isSkeleton.category = false;
          }
        });
    },
    async filterCategoryById({ commit, state }, catId = null) {
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
    },
    async deleteCategory({ state }, catId = null) {
      // state.isDeleted.category = true

      await axios({
        method: "DELETE",
        url: state.base_url + 'category/' + catId,
        headers: {
          Authorization: sessionStorage.getItem('token')
        }
      }).then(r => {
        if (r.data.status == "Success") {
          state.isDeleted.category = true
        }
      }).catch(err => {
        console.log(err.response.status)
        state.isDeleted.category = false
        console.log(err);
      })
    },

    //items
    async deleteItem({ state }, itemId = null) {
      await axios({
        method: "DELETE",
        url: state.base_url + 'item/' + itemId,
        headers: {
          Authorization: sessionStorage.getItem('token')
        }
      }).then(r => {
        if (r.data.status == "Success") {
          state.isDeleted.item = true
        }

      }).catch(err => {
        state.isDeleted.item = false
        console.log(err);
      })
    },

    //dashboard
    async fetchDashboard({ commit, state }) {
      await axios({
        url: state.base_url + "dashboard",
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Access-Control-Allow-Headers": "*"
        }
      }).then(r => {
        commit("basic", {
          key: "activeUserCount",
          value: r.data.data.active_users_total
        });
        commit("basic", {
          key: "bannedUserCount",
          value: r.data.data.banned_users_total
        });
        commit("basic", {
          key: "users",
          value: r.data.data.users
        });
        // sessionStorage.setItem("users", JSON.stringify(r.data.data.users));
      });
    },
    async clearSearch({ commit }) {
      const searchModel = {
        user: "",
        categories: "",
        items: "",
        invoices: ""
      }
      commit('basic', {
        key: "searchModel",
        value: searchModel
      })
    }
  },
  modules: {}
});

