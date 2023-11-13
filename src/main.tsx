import ReactDOM from 'react-dom/client'
import Routes from './Routes.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import ReactQueryProvider from './providers/ReactQueryProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ReactQueryProvider>
        <Routes />
    </ReactQueryProvider>
)
