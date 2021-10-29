import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    meta: {
      title: "Landing Page",
      formScreen: true
    },
    path: "/",
    name: "landingPage",
    component: () => import(/* webpackChunkName: "landingPage" */ "../views/LandingPage")
  },
  {
    meta: {
      title: "Login",
      formScreen: true
    },
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login")
  },
  {
    // Document title tag
    meta: {
      title: "Dashboard"
    },
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  },
  {
    meta: {
      title: "Category"
    },
    path: "/user/category/:catId",
    name: "category",
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category")
  },
  {
    meta: {
      title: "Profile"
    },
    path: "/user/profile/:id",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile")
  },
  {
    meta: {
      title: "Change Password",
      formScreen: true
    },
    path: "/change-password",
    name: "changePassword",
    component: () =>
      import(/* webpackChunkName: "changePassword" */ "../views/ChangePassword")
  },
  {
    meta: {
      title: "ResetPassword",
      formScreen: true
    },
    path: "/reset-password/:token",
    name: "resetPassword",
    component: () =>
      import(/* webpackChunkName: "resetPassword" */ "../views/ResetPassword")
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
  },
  {
    meta: {
      title: "Page Not Found",
      formScreen: true
    },
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import(/* webpackChunkName: "notfound" */ "../views/404")
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
