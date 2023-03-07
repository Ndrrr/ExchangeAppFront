import "../../styles/registration.css";
import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

import ibaLogo from "../../././images/iba-logo-sky-blue.svg";
import loginImage from "../../././images/login-image.svg";
import userIcon from "../../././images/user-icon.svg";
import mailIcon from "../../././images/mail-icon.svg"
import lockIcon from "../../././images/lock-icon.svg";

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [navigate, setNavigate] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (passwordError === '' && emailError === '' && passwordConfirmError === '') {
      await axios.post('api/auth/register', {
        fullName,
        email,
        password,
      }).then((response) => {
        if (response.status === 200) {
          setNavigate(true);
        }
      }).catch((error) => {
        console.log(error);
        if (error.request.status === 500) {
          setEmailError('User with this email already exists');
        } else {
          setError('Something went wrong');
        }
      });
      //setNavigate(true);
    }
  }
  if (navigate) {
    return <Navigate to="/login"/>
  }

  const onEmailChange = async (e) => {
    setEmail(e.target.value);

    // email must be valid
    if (!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Email must be valid');
    } else {
      setEmailError('');
    }
  }

  const onPasswordChange = async (e) => {
    setPassword(e.target.value);

    if (!e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      let errorMsg = `Password must contain at ` + `<b>least</b>`;
      if (!e.target.value.match(/^(?=.*\d)/gm)) {
        errorMsg += ` <li>one number</li>`;
      }
      if (!e.target.value.match(/^(?=.*[a-z])/gm)) {
        errorMsg += ` <li>one lowercase letter</li>`;
      }
      if (!e.target.value.match(/^(?=.*[A-Z])/gm)) {
        errorMsg += ` <li>one uppercase letter</li>`;
      }
      if (!e.target.value.match(/^(?=.*[@$!%*?&])/gm)) {
        errorMsg += ` <li>one special character</li>`;
      }
      if (!e.target.value.match(/^(?=.{8,})/gm)) {
        errorMsg += ` <li>8 characters</li>`;
      }
      setPasswordError(errorMsg);
    } else {
      setPasswordError('');
    }
  }

  const onPasswordConfirmChange = async (e) => {
    setPassword2(e.target.value);

    // password must match
    if (e.target.value !== password) {
      setPasswordConfirmError('Password must match');
    } else {
      setPasswordConfirmError('');
    }
  }

  return (
    <div className="page-container">

      <header className="header">
        <a href="./register" className="header-link"><img src={ibaLogo}
                                                          alt="IBA Tech Academy"/></a>
      </header>

      <section className="registration-section">
        <img className="registration-section-image" src={loginImage} alt="404"/>
        <div className="registration-section-container">
          <h1 className="registration-section-container-title">Create An Account</h1>
          <p className="registration-section-container-description">Create your account, it takes less than a
            minute. If
            you already have an account - <Link to="/login"
                                                className="registration-section-container-description-link">login</Link>
          </p>
          <form onSubmit={onSubmit} className="registration-section-container-form">
            <div className="registration-section-container-form-input-wrapper">
              <img src={userIcon} alt="User Icon"/>
              <label htmlFor="full-name"></label>
              <input className="registration-section-container-form-input" id="full-name" placeholder="Full name"
                     type="text" onChange={e => setFullName(e.target.value)}/>
            </div>
            <div className="registration-section-container-form-input-wrapper">
              <img src={mailIcon} alt="User Icon"/>
              <label htmlFor="email"></label>
              <input className="registration-section-container-form-input" id="email" placeholder="Email address"
                     type="email" onChange={onEmailChange}/>
              <p className={'text-danger'}>{emailError}</p>
            </div>
            <div className="registration-section-container-form-input-wrapper">
              <img src={lockIcon} alt="User Icon"/>
              <label htmlFor="password"></label>
              <input className="registration-section-container-form-input" id="password" placeholder="Password"
                     type="password" onChange={onPasswordChange}/>
              <p className={'text-danger'} dangerouslySetInnerHTML={{ __html:passwordError}}></p>
            </div>

            <div className="registration-section-container-form-input-wrapper mb0">
              <img src={lockIcon} alt="User Icon"/>
              <label htmlFor="confirm-password"></label>
              <input className="registration-section-container-form-input" id="confirm-password"
                     placeholder="Confirm Password" type="password" onChange={onPasswordConfirmChange}/>
              <p className={'text-danger'}>{passwordConfirmError}</p>

            </div>
            <input type="submit" value="Create account" className="registration-section-container-form-submit"/>
          </form>
          <p className="text-danger">{error}</p>
        </div>
      </section>
    </div>
  )
}