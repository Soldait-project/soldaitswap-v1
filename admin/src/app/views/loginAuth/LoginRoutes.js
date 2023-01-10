import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const ResetPassword = Loadable(lazy(() => import("./JwtRegister")));

const loginRoutes = [
    {
        path: '/login',
        element: <JwtLogin />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password/:id',
        element: <ResetPassword />,
    },
]

export default loginRoutes
