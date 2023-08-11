import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const SubscribersList = Loadable(lazy(() => import("./list/View")));

const Routes = [
    {
        path: '/subscribers-list',
        element: <SubscribersList />,
    }
]

export default Routes
