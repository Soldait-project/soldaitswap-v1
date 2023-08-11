import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import{Icon,IconButton} from '@mui/material'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { ToastContainer } from 'react-toastify'
import { SnackbarProvider, useSnackbar } from "notistack";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
    const all_pages = useRoutes(AllPages())

    function SnackbarCloseButton({ snackbarKey }) {
        const { closeSnackbar } = useSnackbar();
      
        return (
          <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <Icon color="info">highlight_off</Icon>
          </IconButton>
        );
      }
    return (
        <Provider store={Store}>
            <SettingsProvider>
                <ToastContainer />
                <SnackbarProvider 
                action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <MatxTheme>
                    <AuthProvider>{all_pages}</AuthProvider>
                </MatxTheme>
                </SnackbarProvider>
            </SettingsProvider>
        </Provider>
    )
}

export default App
