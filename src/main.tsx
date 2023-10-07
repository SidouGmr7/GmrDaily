import ReactDOM from 'react-dom/client'
import Routes from './Routes.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import ReactQueryProvider from './providers/ReactQueryProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ReactQueryProvider>
        <Routes />
    </ReactQueryProvider>
)
