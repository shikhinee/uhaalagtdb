import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "context/state";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./pages/global/Navbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "context/state";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import LoginPage from "pages/login";
import Branch from "pages/branches";
import Departments from "pages/departments";
import CardRequests from "pages/cardRequests";
import AddCard from "pages/addCard";
import EditCard from "pages/editCard";
import EditCardAdmin from "pages/editCardAdmin";
import RegisterPage from "pages/register";
import RoleBasedElement from "components/RoleBasedElement";
import UserRequests from "pages/userRequests";
import Users from "pages/users";
import Cards from "pages/cards";
import Card from "pages/card";
import ChangePassword from "pages/changePassword";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  return (
    <GlobalProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <AppContent location={location} isSidebar={isSidebar} />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </GlobalProvider>
  );
}

function AppContent({ isSidebar }) {
  const location = useLocation();
  useEffect(() => {
    // Triggered when the location changes
  }, [location]);
  const { islogin, login, logout, role, decodedToken } =
    useContext(GlobalContext);
  const showLayout =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    !location.pathname.startsWith("/card/");

  return (
    <>
      <Toaster />
      {showLayout && <Sidebar isSidebar={isSidebar} />}
      <main className="content">
        {showLayout && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              islogin ? (
                <RoleBasedElement
                  allowedRoles={["Admin", "branchAdmin", "Accepted"]}
                >
                  <Dashboard />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/departments/:branchID"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin", "branchAdmin"]}>
                  <Departments />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/branch"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin"]}>
                  <Branch />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/cards"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin", "branchAdmin"]}>
                  <Cards />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/cardRequests"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["branchAdmin", "Admin"]}>
                  <CardRequests />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin", "branchAdmin"]}>
                  <Users />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/userrequests"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin", "branchAdmin"]}>
                  <UserRequests />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/add"
            element={
              islogin ? (
                <RoleBasedElement
                  allowedRoles={["Admin", "branchAdmin", "Accepted"]}
                >
                  <AddCard />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/edit"
            element={
              islogin ? (
                <RoleBasedElement
                  allowedRoles={["Admin", "branchAdmin", "Accepted"]}
                >
                  <EditCard />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/editcardAdmin/:cardID"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin", "branchAdmin"]}>
                  <EditCardAdmin />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/changePassword"
            element={
              islogin ? (
                <RoleBasedElement
                  allowedRoles={["Admin", "branchAdmin", "Accepted"]}
                >
                  <ChangePassword />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/contacts"
            element={
              islogin ? (
                <RoleBasedElement allowedRoles={["Admin"]}>
                  <Contacts />
                </RoleBasedElement>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/card/:cardID" element={<Card />} />
          <Route
            path="/login"
            element={!islogin ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            key="register"
            path="/register"
            element={!islogin ? <RegisterPage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </>
  );
}
export default App;
