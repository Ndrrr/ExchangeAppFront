import "../styles/user-profile.css"
import "../styles/short-url.css"
import {Link} from "react-router-dom";
import backgroundImage from "../images/landing-background.svg";

export const Landing = () => {

  return (
    <div className="short-url-container">
      <div className="short-url-content">
        <h2 className="short-url-title">Lorem</h2>
        <p className="short-url-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.</p>
        <Link to="/exchange" className="short-url-btn">get started</Link>
      </div>
      <div>
        <img src={backgroundImage} className="short-url-img" alt="landing-background"/>
      </div>
    </div>
  )
}