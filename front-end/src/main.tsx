import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { UserContextProvider } from './lib/context/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </BrowserRouter>,
)
