import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { GlobalProvider } from "context/state";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./pages/global/Navbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import { useState, useContext } from "react";
import { GlobalContext } from "context/state";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
import RoleBasedElement from "components/RoleBasedElement";

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

function AppContent({ location, isSidebar }) {
  const { islogin, login, logout, role } = useContext(GlobalContext);
  console.log(role);
  const showLayout =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {showLayout && <Sidebar isSidebar={isSidebar} />}
      <main className="content">
        {showLayout && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              islogin ? (
                // <RoleBasedElement
                //   allowedRoles={[
                //     "admin",
                //     "branchAdmin",
                //     "departmentAdmin",
                //     "user",
                //   ]}
                // >
                <Dashboard />
              ) : (
                // {/* </RoleBasedElement> */}
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/team"
            element={
              islogin ? (
                // <RoleBasedElement
                //   allowedRoles={["admin", "branchAdmin", "departmentAdmin"]}
                // >
                <Team />
              ) : (
                // {/* </RoleBasedElement> */}
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/contacts"
            element={
              islogin ? (
                // <RoleBasedElement allowedRoles={["admin", "branchAdmin"]}>
                <Contacts />
              ) : (
                // {/* </RoleBasedElement> */}
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/invoices"
            element={
              islogin ? (
                // <RoleBasedElement allowedRoles={["admin"]}>
                <Invoices />
              ) : (
                // {/* </RoleBasedElement> */}
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={!islogin ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!islogin ? <RegisterPage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </>
  );
}
export default App;
