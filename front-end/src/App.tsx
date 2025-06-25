import { Navigate, Route, Routes } from "react-router"
import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/SignupPage"
import DashboardPage from "./pages/Dashboard"
import SettingsPage from "./pages/Settings"
import AffirmationsPage from "./pages/Affirmations"
import EntriesPage from "./pages/Entries"
import JournalPage from "./pages/Journal"
import { useUserHook } from "./lib/context/userContext"
import ErrorBoundary from "./components/ErrorBoundary"
import { Analytics } from "@vercel/analytics/react"


function App() {
  const { user } = useUserHook()
  
 
  return (
    <ErrorBoundary>
          <div>
            
            {/* Routing */}
            <Routes >
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={
                !user ? <LoginPage /> : <Navigate to="/dashboard" replace />
                } />
              <Route path="/signup" element={
                !user ? <Signup /> : <Navigate to={'/dashboard'} replace />
                } />
              <Route path="/dashboard" element={
                user? <DashboardPage /> : <Navigate to={'/login'} replace />
                } />
              <Route path="/settings" element={
                user? <SettingsPage /> : <Navigate to={'/login'} replace />
              } />
              <Route path="/affirmations" element={
                user? <AffirmationsPage /> : <Navigate to={'/login'} replace />} />
              <Route path="/entries" element={
                user? <EntriesPage /> : <Navigate to={'/login'} replace />
              } />
              <Route path="/journal/:id" element={
                user ? <JournalPage /> : <Navigate to={'/login'} replace />
              }  />
            </Routes>
                    <Analytics />
          </div>
    </ErrorBoundary>

  )
}

export default App
