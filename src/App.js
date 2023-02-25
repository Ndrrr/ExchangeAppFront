import React, {Component} from 'react';
import './App.css';
import RequireAuth from "./components/auth/RequireAuth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ForgotPassword, Layout, Login, Missing, Register, Unauthorized} from "./components";
import {AuthProvider} from "./context/AuthProvider";
import './axios-conf';
import {ResetPassword} from "./components/auth/ResetPassword";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              {/* public routes */}
              <Route path="/unauthorized" element={<Unauthorized/>}/>

              <Route element={<RequireAuth allowedRoles={["Unauthenticated"]}/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                <Route path={"/reset-password/:resetToken"} element={<ResetPassword/>}/>
              </Route>

              {/*protected routes */}

              <Route element={<RequireAuth allowedRoles={["Authenticated"]}/>}>

              </Route>

              {/* catch all */}
              <Route path="*" element={<Missing/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default App;
