export default [
  [
    {
      to: "/dashboard",
      icon: "home",
      label: "Dashboard"
    },
    // {
    //   to: "/analytics",
    //   label: "Google Analytics",
    //   icon: "trending-up"
    // },
    {
      to: "/change-password",
      label: "Change Password",
      icon: "lock"
    },
    {
      to: "/login",
      label: "Log Out",
      icon: "log-out",
      action: () => {
        localStorage.removeItem("jwt");
      }
    }
  ]
];
//   {
//     label: "User",
//     subLabel: "",
//     icon: "users",
//     color: "gray-300",
//     menu: [
//       {
//         to: "/user/all",
//         icon: "circle",
//         label: "All User"
//       },
//       {
//         to: "/user/banned",
//         icon: "circle",
//         label: "Banned Users"
//       }
//     ]
//   }
// ],
// [
//   {
//     to: "/restaurant/all",
//     icon: "box",
//     label: "Restaurant"
//   }
