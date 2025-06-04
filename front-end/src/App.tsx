import { Route, Routes } from "react-router"
import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/SignupPage"
import DashboardPage from "./pages/Dashboard"
import SettingsPage from "./pages/Settings"
import AffirmationsPage from "./pages/Affirmations"
import EntriesPage from "./pages/Entries"

function App() {

  return (
  <div>
    

    {/* Routing */}
    <Routes >
      <Route path="/" element={<WelcomePage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/settings" element={<SettingsPage />} />
       <Route path="/affirmations" element={<AffirmationsPage />} />
       <Route path="/entries" element={<EntriesPage />} />
    </Routes>
   
  </div>
  )
}

export default App
