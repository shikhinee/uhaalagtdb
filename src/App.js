import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UserContextProvider } from "context/UserContext";
import { ApiContextProvider } from "context/ApiContext";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/global/Navbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import { useState } from "react";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
// import Bar from "./pages/bar";
// import Form from "./pages/form";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
// import Calendar from "./pages/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <UserContextProvider>
      <ApiContextProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Navbar />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  {/* <Route path="/form" element={<Form />} /> */}
                  {/* <Route path="/bar" element={<Bar />} /> */}
                  {/* <Route path="/pie" element={<Pie />} /> */}
                  {/* <Route path="/line" element={<Line />} /> */}
                  {/* <Route path="/faq" element={<FAQ />} /> */}
                  {/* <Route path="/geography" element={<Geography />} /> */}
                  {/* <Route path="/calendar" element={<Calendar />} /> */}
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ApiContextProvider>
    </UserContextProvider>
  );
}

export default App;
