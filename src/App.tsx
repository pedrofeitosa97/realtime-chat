import { AuthProvider } from './providers/AuthProvider'
import GlobalStyle from './styles/GlobalStyle'
import { RoutesMain } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <ToastContainer />
        <RoutesMain />
      </AuthProvider>
    </>
  )
}

export default App
