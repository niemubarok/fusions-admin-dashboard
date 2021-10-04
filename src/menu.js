

export default [
  [
    {
      to:'/dashboard',
      icon:'home',
      label:'Dashboard'
    },
    {
      label: 'User',
      subLabel: '',
      icon: 'grid',
      color:'gray-300',
      menu: [
        {
          to: '/user/all',
          icon: 'circle',
          label: 'All User'
        },
        {
          to: '/user/banned',
          icon: 'circle',
          label: 'Banned Users'
        }
      ]
    }
  ],
  [
    {
      to: '/restaurant/all',
      icon: 'box',
      label: 'Restaurant'
    }
  ],
  [
    {
      to: '/analytics',
      label: 'Google Analytics',
      icon: 'message-square',
      // updateMark: true
    },
  //   {
  //     to: '/modifier',
  //     label: 'Modifier',
  //     icon: 'sliders'
  //   },
  //   {
  //     to: '/banner',
  //     label: 'Banner',
  //     icon: 'bookmark'
  //   },
  // ],
  // 'General',
  // [
  //   {
  //     to:'/qr-code',
  //     label: 'QR-Code',
  //     icon: 'grid'
  //   },
  //   {
  //     to:'/publish',
  //     label: 'Publish',
  //     icon: 'send'
  //   },
  //   {
  //     to:'/view-menu',
  //     label: 'View Menu',
  //     icon: 'eye'
  //   },
  //   {
  //     to:'/devices',
  //     label: 'Devices',
  //     icon: 'tablet'
  //   },
  //   {
  //     to:'/settings',
  //     label: 'Setting',
  //     icon: 'settings'
  //   }
  ]
]
