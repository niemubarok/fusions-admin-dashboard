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
    user:"",
    allCategories:[],
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

    // search model
    searchModel: {
      user: "",
      categories: "",
      items: "",
      invoices: ""
    },

    notification:"",
    isPasswordChanged:false
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
        url: "http://35.188.119.8/cloud-menu/api/v1/admin/login",
        // url: "http://35.188.119.8/cloud-menu/api/v1/admin/register",
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
          if (res.status == 200)
            localStorage.setItem("token", res.data.data.token);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async changePassword({commit}, payload = null){
      await axios({
        url:"http://35.188.119.8/cloud-menu/api/v1/admin/changepass",
        method:"POST",
        data:{
          old_password:payload.oldPassword,
          new_password:payload.newPassword
        },
        headers:{
          Authorization:localStorage.getItem('token')
        }
      }).then(r=>{
        console.log(r.data);
        if(r.data.status == "Success"){
          commit('basic',{
            key:'isPasswordChanged',
            value:true
          })
        }else{
          commit('basic',{
            key:'isPasswordChanged',
            value:false
          })
        }
      }).catch((err)=>{
        console.log("err", err);
        commit('basic',{
          key:'isPasswordChanged',
          value:false
        })
      })
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
    async fetchUserById({commit}, uid= null){
      await axios({
        url:"http://35.188.119.8/cloud-menu/api/v1/admin/user/" + uid,
        method:"GET",
        headers:{
          Authorization:localStorage.getItem("token")
        }
      }).then(r=>{

        localStorage.setItem('user', JSON.stringify(r.data.data.detail))
        localStorage.setItem('allCategories', JSON.stringify(r.data.data.categories))
        commit('basic',{
          key:'user',
          value:r.data.data.detail
        })
        commit('basic',{
          key:'allCategories',
          value:r.data.data.categories
        })
      })
    },
    
    async filterUsersById({ commit, state }, userId = null) {
      if (localStorage.getItem("users")) {
        const filterById = state.users.filter(filtered => {
          // console.log("filtered.uid", filtered);
          return filtered.uid == userId;
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
    async fetchCategories({ commit }, userId= null) {
      await axios
        .get("http://35.188.119.8/cloud-menu/api/v1/admin/items/user/"+ userId, {
          headers: {
            Authorization: localStorage.getItem("token")
          }})
        // .get("data-sources/categories.json")

        .then(r => {
          // console.log(r.data.data.categories);
          localStorage.setItem("categories", JSON.stringify(r.data.data.categories))
          if (r.data) {
            commit("basic", {
              key: "categories",
              value: r.data.data.categories
            });
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
    // async fetchItems({ commit, state }, uid = null) {
    //   await axios
    //     .get("http://35.188.119.8/cloud-menu/api/v1/admin/items/user/" + uid, {
    //       headers: {
    //         Authorization: localStorage.getItem("token")
    //       }
    //     })
    //     .then(r => {
    //       // console.log(r.data);
    //       if (r.data) {
    //         if (r.data.data) {
    //             commit("basic", {
    //               key: "items",
    //               value: each.items
    //             });
              
    //         }
    //       }
    //     });
    // },
    async fetchDashboard({ commit }) {
      await axios({
        url: "http://35.188.119.8/cloud-menu/api/v1/admin/dashboard",
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Access-Control-Allow-Headers": "*"
        }
      }).then(r => {
        commit("basic", {
          key: "activeUserCount",
          value: r.data.data.active_users_total
        });
        commit("basic", {
          key: "bannerUserCount",
          value: r.data.data.banned_users_total
        });
        commit("basic", {
          key: "users",
          value: r.data.data.users
        });
        localStorage.setItem("users", JSON.stringify(r.data.data.users));
      });
    }
  },
  modules: {}
});
