import "../app/globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoUserLayout from "./layouts/NoUserLayout";
import LandingPage from "./pages/(baseLanding)/landingPage/LandingPage";
import LoginPage from "./pages/(authentication)/loginPage/LoginPage";
import RegisterPage from "./pages/(authentication)/registerPage/RegisterPage";
import UserLoggedInLayout from "./layouts/UserLoggedInLayout";
import MainDashboard from "./pages/(institutionDashboard)/mainDashboard/MainDashboard";
import CreateInstitution from "./pages/(institutionDashboard)/createInstitution/CreateInstitution";
import InstitutionDetail from "./pages/(institutionDashboard)/institututionDetail/InstitutionDetail";
import ChatComponent from "./pages/ChatComponent";
import CreateCourse from "./pages/(institutionDashboard)/institututionDetail/forms/CreateCourse";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoUserLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/dashboard" element={<UserLoggedInLayout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/dashboard/institution-main"
            element={<MainDashboard />}
          />
          <Route
            path="/dashboard/institution-create"
            element={<CreateInstitution />}
          />
          <Route
            path="/dashboard/institution-detail/:id"
            element={<InstitutionDetail />}
          />
          <Route
            path="/dashboard/institution-detail/:id/create-course"
            element={<CreateCourse />}
          />
          <Route path="/dashboard/chat/:roomname" element={<ChatComponent />} />



        </Route>
      </Routes>
    </Router>
  );
}

export default App;
