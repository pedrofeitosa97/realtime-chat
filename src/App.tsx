import { AuthProvider } from './providers/AuthProvider'
import GlobalStyle from './styles/GlobalStyle'
import { RoutesMain } from './routes'

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <RoutesMain />
      </AuthProvider>
    </>
  )
}

export default App
