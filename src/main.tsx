import ReactDOM from "react-dom/client"
import Routes from "./Routes.tsx"
import "./index.css"
import "primereact/resources/themes/lara-light-indigo/theme.css" // theme
import "primereact/resources/primereact.css" // core css
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <Routes />
    </QueryClientProvider>
)
