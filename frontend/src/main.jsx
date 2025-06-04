import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
    <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
  </SnackbarProvider>,

)
