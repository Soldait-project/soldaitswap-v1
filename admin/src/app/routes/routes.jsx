import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import LoginRoutes from 'app/views/loginAuth/LoginRoutes'
import SwapRoutes from 'app/views/swaphistory/Routes'
import LiqRoutes from 'app/views/liqutityhistory/Routes'
import userRoutes from 'app/views/userlist/Routes'
import farmsRoutes from 'app/views/farms/Routes'
import poolsRoutes from 'app/views/pools/Routes'
import currencyRoutes from 'app/views/currency/Routes'
import newsletterRoutes from 'app/views/newsletter/Routes'
import sitesettingsRoutes from 'app/views/sitesettings/Routes'
import sitesecurity from 'app/views/security/Routes'
import tokenmanagement from 'app/views/Token_management/Routes'
import settings from 'app/views/settings/Routes'
import cms from 'app/views/cms/Routes'

import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [
                ...dashboardRoutes,
                ...chartsRoute,
                ...materialRoutes,
                ...SwapRoutes,
                ...LiqRoutes,
                ...userRoutes,
                ...farmsRoutes,
                ...poolsRoutes,
                ...newsletterRoutes,
                ...sitesettingsRoutes,
                ...sitesecurity,
                ...tokenmanagement,
                ...settings,
                ...currencyRoutes,
                ...cms,
            ],
        },
        ...LoginRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
