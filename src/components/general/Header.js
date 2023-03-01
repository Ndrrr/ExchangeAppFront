import "../../styles/main-page.css"
import logoutIcon from "../../images/log-out-icon.svg";
import userIconWithBackground from "../../images/user-icon-with-background.svg";
import ibaTechLogoWhite from "../../images/iba-tech-logo-white.svg";

import {Link} from "react-router-dom";
import {getAccessToken, removeCookies} from "../../util/jwtUtil";
import useAuth from "../../hooks/useAuth";
import Cookies from "universal-cookie";
import axios from "axios";
import {useEffect, useState} from "react";

const cookies = new Cookies();

export const Header = (loginChecker) => {
  const {setAuth} = useAuth();

  const [pageRefresher, setPageRefresher] = useState(0);

  const refreshPage = () => {
    setPageRefresher(pageRefresher + 1);
  }

  useEffect(() => {
    if (loginChecker.funs.isLoggedIn() === true) {
      loginChecker.funs.setNewLogin(false);
      refreshPage();
    }
  })

  const checkAuth = () => {
    return getAccessToken() !== null;
  }

  const getFullName = () => {
    return cookies.get('fullName');
  }

  const logout = async () => {
    await axios.get('api/auth/logout', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    await removeCookies()
    setAuth({});
    window.location.reload();
  }

  return (
    checkAuth() ?
      <header className="main-header">
        <Link to="./main-page" className="main-header-logo"><img src={ibaTechLogoWhite}
                                                                 alt="IBA Tech Academy"/></Link>
        <div className="main-header-wrapper">
          <div className="main-header-profile-wrapper">
            <div className="main-header-profile-credentials">
              <span className="main-header-username">{getFullName()}</span>
              <div className="log-out-block" onClick={logout}>
                <img src={logoutIcon} alt="Log out"/>
                <Link to="./" className="log-out-btn">Log out</Link>
              </div>
            </div>
            <img className="main-header-user-icon" src={userIconWithBackground} alt="User Icon"/>
          </div>
        </div>
      </header> : <header/>
  )
}