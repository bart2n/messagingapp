import "../app/globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoUserLayout from "./layouts/NoUserLayout";
import LandingPage from "./pages/(baseLanding)/landingPage/LandingPage";
import LoginPage from "./pages/(authentication)/loginPage/LoginPage";
import RegisterPage from "./pages/(authentication)/registerPage/RegisterPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoUserLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
