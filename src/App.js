import React, {Component} from 'react';
import './App.css';
import RequireAuth from "./components/auth/RequireAuth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
  Exchange,
  ExchangeBetter,
  ForgotPassword,
  Landing,
  Layout,
  Login,
  Missing, Rates,
  Register,
  Unauthorized
} from "./components";
import {AuthProvider} from "./context/AuthProvider";
import './axios-conf';
import {ResetPassword} from "./components/auth/ResetPassword";
import {getIsLoggedIn, setNewLogIn} from "./util/loginHelper";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout isLoggedIn={getIsLoggedIn} setNewLogin={setNewLogIn}/>}>
              {/* public routes */}
              <Route path="/unauthorized" element={<Unauthorized/>}/>

              <Route element={<RequireAuth allowedRoles={["Unauthenticated"]}/>}>
                <Route path="/" element={<Login setNewLogin={setNewLogIn}/>}/>
                <Route path="/login" element={<Login setNewLogin={setNewLogIn} />}/>
                <Route path="/register" element={<Register/>}/>
                <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                <Route path={"/reset-password/:resetToken"} element={<ResetPassword/>}/>
              </Route>

              {/*protected routes */}

              <Route element={<RequireAuth allowedRoles={["Authenticated"]}/>}>
                <Route path="/landing" element={<Landing/>}/>
                <Route path="/exchange" element={<Exchange/>}/>
                <Route path="/exchange-better" element={<ExchangeBetter/>}/>
                <Route path="/rates" element ={<Rates/>}/>
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
