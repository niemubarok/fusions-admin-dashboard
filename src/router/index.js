import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    meta: {
      title: "Login",
      formScreen: true
    },
    path: "/",
    name: "login",
    component: () => import("../views/Login")
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard"
    },
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Home.vue")
  },
  {
    meta: {
      title: "All User"
    },
    path: "/user/all",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/Users")
  },
  {
    meta: {
      title: "Profile"
    },
    path: "/user/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile")
  },
  {
    meta: {
      title: "Banned User"
    },
    path: "/user/banned",
    name: "banned",
    component: () =>
      import(/* webpackChunkName: "banned" */ "../views/BannedUser")
  },
  {
    meta: {
      title: "Restaurant List"
    },
    path: "/restaurant/all",
    name: "restaurant",
    component: () =>
      import(/* webpackChunkName: "restaurant" */ "../views/Restaurants")
  },
  {
    meta: {
      title: "Google Analytics"
    },
    path: "/analytics",
    name: "googleAnalytics",
    component: () =>
      import(
        /* webpackChunkName: "googleAnalytics" */ "../views/GoogleAnalytics"
      )
  }
];

const router = createRouter({
  mode: history,
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

export default router;
