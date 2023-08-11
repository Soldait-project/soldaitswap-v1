import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const List = Loadable(lazy(() => import("./Faq")));
const Routes = [
    {
        path: '/faq',
        element: <List />,
    }
]

export default Routes
