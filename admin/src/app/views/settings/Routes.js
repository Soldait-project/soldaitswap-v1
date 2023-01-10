import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const List = Loadable(lazy(() => import("./list/ChangePassword")));
const Apy = Loadable(lazy(() => import("./list/Apysettings")));

const Routes = [
    {
        path: '/settings',
        element: <List />,
    },
    {
        path: '/apysettings',
        element: <Apy />,
    }
]

export default Routes
