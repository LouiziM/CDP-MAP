import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "theme";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from './components/Login';
import RequireAuth from './utils/RequireAuth';
import Layout from "scenes/layout";
import UserManagement from "scenes/admin/index";
import ClientProfile from "scenes/client_profile/clientProfile";
import ClientList from "scenes/clients/clientList";
import NotFound from 'NotFound';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from 'features/auth/authSlice';
import { isAdmin } from 'utils/Roles';
import ClientsMap from 'scenes/map/ClientsMap';
import Dashboard from 'scenes/dashboard/dashboard';
import LineOne from 'scenes/pg/lineOne';
import LineTwo from 'scenes/pg/lineTwo';
import LineThree from 'scenes/pg/lineThree';
import LineFour from 'scenes/pg/lineFour';
import LineFive from 'scenes/pg/lineFive';
import LineSix from 'scenes/pg/lineSix';
import TreeMap from 'scenes/pg/treeMap';
import PieOne from 'scenes/pg/pieOne';
import PieTwo from 'scenes/pg/PieTwo';
import PieThree from 'scenes/pg/pieTree';
import PieFour from 'scenes/pg/pieFour';
import HorizontalTables from 'scenes/pg/Tables';

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            {/* public routes */}
            <Route path="/" element={<LoginRedirect />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                {isAdmin(user|| storedUser) &&<> <Route path="/utilisateurs" element={<UserManagement />} />
                <Route path="*" element={<NotFound />} />
                </>}
                {!isAdmin(user|| storedUser) &&
                  <>
                    <Route path="/clientprofile" element={<ClientProfile />} />
                    <Route path="/clients" element={<ClientList />} />
                    <Route path="/map" element={<ClientsMap />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/LineOne" element={<LineOne />} />
                    <Route path="/LineTwo" element={<LineTwo />} />
                    <Route path="/LineThree" element={<LineThree />} />
                    <Route path="/LineFour" element={<LineFour />} />
                    <Route path="/LineFive" element={<LineFive />} />
                    <Route path="/LineSix" element={<LineSix />} />
                    <Route path="/TreeMap" element={<TreeMap />} />
                    <Route path="/PieOne" element={<PieOne />} />
                    <Route path="/PieTwo" element={<PieTwo />} />
                    <Route path="/PieThree" element={<PieThree />} />
                    <Route path="/pieFour" element={<PieFour />} />
                    <Route path="/tables" element={<HorizontalTables />} />


                  </>
                }
              </Route>
            </Route>
            <Route path="/*" element={<NotFound />} />

          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

const LoginRedirect = () => {
  const storedToken = localStorage.getItem("authToken");
  const token = useSelector(selectCurrentToken)|| storedToken;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector(selectCurrentUser);  
  
  return token||user ? <Navigate to={isAdmin(user||storedUser) ? "/utilisateurs" : "/clients"} replace /> : <Login />;
};