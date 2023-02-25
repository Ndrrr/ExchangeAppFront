import '../../styles/forgot-password.css';
import {useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import ibaLogo from "../../././images/iba-logo-sky-blue.svg";
import loginImage from "../../././images/login-image.svg";
import mailIcon from "../../././images/mail-icon.svg";
import lockIcon from "../../images/lock-icon.svg";
import {getDecodedToken} from "../../util/jwtUtil";

export const ResetPassword = () => {
  const {resetToken} = useParams()

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`api/auth/reset-password/${resetToken}`, {
      password
    }).then((response) => {
      if (response.status === 200) {
        setSuccess('Password reset successfully');
      } else {
        setError('Something went wrong, please try again later');
      }
    }).catch((error) => {
      setError('Something went wrong, please try again later');
    });

    setTimeout(() => {
      navigate(from);
    }, 1500);
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
        <Link to="/login" className="header-link"><img src={ibaLogo}
                                                       alt="IBA Tech Academy"/></Link>
      </header>

      <section className="reset-section">
        <img className="reset-section-image" src={loginImage} alt="404"/>
        <div className="reset-section-container">
          <h1 className="reset-section-container-title">Reset Password!</h1>
          <p className="reset-section-container-description">We’ll e-mail you instruction on how to reset your
            password</p>
          <form onSubmit={onSubmit} className="reset-section-container-form">
            <div className="reset-section-container-form-input-wrapper">
              <img src={mailIcon} alt="User Icon"/>
              <label htmlFor="email"></label>
              <input className="reset-section-container-form-input" id="email"
                     value={getDecodedToken(resetToken)?.sub} readOnly={true}
              />
            </div>

            <div className="registration-section-container-form-input-wrapper">
              <img src={lockIcon} alt="User Icon"/>
              <label htmlFor="password"></label>
              <input className="registration-section-container-form-input" id="password" placeholder="Password"
                     type="password" onChange={onPasswordChange}/>
              <p className={'text-danger'} dangerouslySetInnerHTML={{__html: passwordError}}></p>
            </div>

            <div className="registration-section-container-form-input-wrapper mb0">
              <img src={lockIcon} alt="User Icon"/>
              <label htmlFor="confirm-password"></label>
              <input className="registration-section-container-form-input" id="confirm-password"
                     placeholder="Confirm Password" type="password" onChange={onPasswordConfirmChange}/>
              <p className={'text-danger'}>{passwordConfirmError}</p>

            </div>

            <div className="reset-section-form-buttons">
              <button onClick={onSubmit} className="reset-section-container-form-login">Reset Password</button>
              <Link to="/register" className="reset-section-container-form-signup">Create account</Link>
            </div>
            <span className="go-back-text">Go back to <Link to="/login" className="go-back-link">Login</Link></span>
            <p className={'text-success'}>{success}</p>
          </form>
        </div>
      </section>
    </div>
  )
}