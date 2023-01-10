import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const List = Loadable(lazy(() => import("./list/View")));
const Routes = [
    {
        path: '/farms',
        element: <List />,
    }
]

export default Routes
