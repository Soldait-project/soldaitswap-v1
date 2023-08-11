export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        name: 'Settings',
        icon: 'settings',
        children: [
            {
                name: 'Change password',
                icon: 'wb_auto',
                path: '/settings',
            },
            {
                name: 'Site Settings',
                path: '/site-settings',
                icon: 'settings_applications',
            },
            {
                name: 'APY Settings',
                path: '/apysettings',
                icon: 'brightness_auto',
            },
        ],
    },
    {
        name: 'User List',
        path: '/users-list',
        icon: 'person',
    },
    {
        name: 'Farms',
        path: '/farms',
        icon: 'local_shipping',
    },
    {
        name: 'Pools',
        path: '/pools',
        icon: 'all_inclusive',
    },
    {
        name: 'Swap History',
        path: '/swapping-list',
        icon: 'swap_horiz',
    },
    {
        name: 'Liquidity History',
        path: '/liqutity-list',
        icon: 'shopping_cart',
    },
    {
        name: 'Subscribers List',
        path: '/subscribers-list',
        icon: 'person_pin',
    },
    {
        name: 'News Letter',
        path: '/news-letter',
        icon: 'description',
    },
    {
        name: 'Token management',
        path: '/token-management',
        icon: 'monetization_on',
    },
    {
        name: 'CMS',
        path: '/cms',
        icon: 'pages'
    },
    {
        name: 'FAQ ',
        icon: 'chat_bubble_outline',
        path: '/faq',
    },

]
