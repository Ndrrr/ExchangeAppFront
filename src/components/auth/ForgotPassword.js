import '../../styles/forgot-password.css';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import ibaLogo from "../../././images/iba-logo-sky-blue.svg";
import loginImage from "../../././images/login-image.svg";
import mailIcon from "../../././images/mail-icon.svg";


export const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    setSuccess('Password reset link will be sent to given email address, if it exists');

    await axios.post('api/auth/forgot-password', {
      email
    });
    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
              <input className="reset-section-container-form-input" id="email" placeholder="Email address"
                     type="email" onChange={e => setEmail(e.target.value)}/>
            </div>
            {success && <div className="text-success fw-bold">{success}</div>}
            <span className="go-back-text">Go back to <Link to="/login" className="go-back-link">Login</Link></span>
            <div className="reset-section-form-buttons">
              <button onClick={onSubmit} className="reset-section-container-form-login">Reset Password</button>
              <Link to="/register" className="reset-section-container-form-signup">Create account</Link>
            </div>
            {error && <div className="text-danger">{error}</div>}

          </form>
        </div>
      </section>
    </div>
  )
}