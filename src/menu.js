export default [
  [
    {
      to: "/dashboard",
      icon: "home",
      label: "Dashboard",
      action: () => false
    },
    {
      to: "/analytics",
      label: "Google Analytics",
      icon: "trending-up",
      action: () => false
    },
    {
      to: "/change-password",
      label: "Change Password",
      icon: "lock",
      action: () => false
    },
    {
      to: "/",
      label: "Log Out",
      icon: "log-out",
      action: () => {
        sessionStorage.clear();
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
