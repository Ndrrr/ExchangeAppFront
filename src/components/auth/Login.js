import '../../styles/login.css';
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Cookies from "universal-cookie";

import ibaLogo from "../../././images/iba-logo-sky-blue.svg";
import loginImage from "../../././images/login-image.svg";
import mailIcon from "../../././images/mail-icon.svg";
import lockIcon from "../../././images/lock-icon.svg";
import googlePlusIcon from "../../././images/google-plus.svg";
import facebookIcon from "../../././images/facebook.svg";
import linkedInIcon from "../../././images/linked-in.svg";
import twitterIcon from "../../././images/twitter.svg";

const cookies = new Cookies();

export const Login = () => {
  const {setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post('api/auth/login', {
      email,
      password
    }).then((response) => {
      if (response.status === 200) {
        let accessToken = response?.data?.token;
        setAuth({accessToken});
        cookies.set('accessToken', accessToken, {path: '/'});
        navigate(from, {replace: true});
      } else {
        setError('Invalid credentials');
      }
    }).catch(() => {
      setError('Invalid credentials');
    });
  }

  return (
    <div className="page-container">
      <header className="header">
        <a href="#" className="header-link"><img src={ibaLogo}
                                                 alt="IBA Tech Academy"/></a>
      </header>

      <section className="login-section">
        <img className="login-section-image" src={loginImage} alt="404"/>
        <div className="login-section-container">
          <h1 className="login-section-container-title">Welcome Back!</h1>
          <p className="login-section-container-description">To keep connected with us please login with
            personal
            information by email address and password</p>
          <form onSubmit={onSubmit} className="login-section-container-form">
            <div className="login-section-container-form-input-wrapper">
              <img src={mailIcon} alt="User Icon"/>
              <label htmlFor="email"></label>
              <input className="login-section-container-form-input" id="email" placeholder="Email address"
                     type="email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="login-section-container-form-input-wrapper">
              <img src={lockIcon} alt="User Icon"/>
              <label htmlFor="password"></label>
              <input className="login-section-container-form-input" id="password" placeholder="Password"
                     type="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <p className={"text-danger"}>{error}</p>
            <div className="login-section-container-options">
              <div className="login-section-container-options-wrapper">
                <label className="login-section-container-options-checkbox-wrapper">Remember Me
                  <input type="checkbox" className="login-section-container-options-old-checkbox"/>
                  <span className="login-section-container-options-checkmark"></span>
                </label>
              </div>
              <Link to="/forgot-password" className="login-section-container-options-link">Forgot
                password?</Link>
            </div>
            <div className="login-section-form-buttons">
              <button type={"submit"} className="login-section-container-form-login">Login now</button>
              <Link to="/register" className="login-section-container-form-signup">Create
                account</Link>
            </div>
            <div className="login-section-form-social">
              <div className="login-section-form-social-description-wrapper">
                <hr className="login-section-form-social-description-line"/>
                <span className="login-section-form-social-description">Or you can Join with</span>
                <hr className="login-section-form-social-description-line"/>
              </div>
              <div className="login-section-form-social-icon-wrapper">
                <a href="#" className="login-section-form-social-icon"><img src={googlePlusIcon}
                                                                            alt="Google Plus"/></a>
                <a href="#" className="login-section-form-social-icon"><img src={facebookIcon}
                                                                            alt="Facebook"/></a>
                <a href="#" className="login-section-form-social-icon"><img src={linkedInIcon}
                                                                            alt="Linked In"/></a>
                <a href="#" className="login-section-form-social-icon mr0"><img src={twitterIcon}
                                                                                alt="Twitter"/></a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}