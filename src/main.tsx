import ReactDOM from 'react-dom/client'
import Routes from './Routes.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ReactQueryProvider from './providers/ReactQueryProvider'
import { ToastProvider } from './providers/ToastProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ReactQueryProvider>
        <ToastProvider>
            <Routes />
        </ToastProvider>
    </ReactQueryProvider>
)
