import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const SwapList = Loadable(lazy(() => import("./list/View")));

const Routes = [
    {
        path: '/p2p-subsription',
        element: <SwapList />,
    }
]

export default Routes
