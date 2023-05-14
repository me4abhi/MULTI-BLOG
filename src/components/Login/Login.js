import { useState } from "react";
import "./Login.css";
import { auth } from "../../services/firebaseConfig";
import { generateRecaptcha } from "../../services/recaptchaService";
import { useNavigate } from "react-router-dom";
import {
  loginWithPhone,
  verifyLoginWithPhone,
} from "../../services/authService";
import { updateUserProfile } from "../../services/userProfileService";

function Login() {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [expandForm, setExpandForm] = useState(false);

  const countryCode = "+91";
  const navigate = useNavigate();

  // In this function, call 'signInWithPhoneNumber()' method on the 'auth' object with user's phone number as a parameter
  const requestOTP = async (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      const phoneNumberWithCode = countryCode + phoneNumber;
      window.appVerifier = generateRecaptcha(auth);

      await loginWithPhone(auth, phoneNumberWithCode, window.appVerifier)
        .then((response) => {
          window.confirmationResult = response;
          setExpandForm(true);
          setResponseMessage("OTP sent successfully.");
        })
        .catch((error) => {
          setResponseMessage(error.toString());
          // resetRecaptcha();
        });
    } else {
      setResponseMessage("Phone number should be exactly 10 digits.");
    }
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      verifyLoginWithPhone(otp)
        .then((credentials) => {
          const currentUser = auth.currentUser;
          const { displayName } = credentials.user;

          if (!displayName) {
            updateUserProfile(currentUser, userName);
          }

          // store login-status to local-storage
          localStorage.setItem("isLoggedIn", "true");

          // redirect to "./blogs" page
          navigate("/posts");
        })
        .catch((error) => {
          setResponseMessage(error.toString());
        });
    }
  };

  return (
    <form id="login-form" onSubmit={requestOTP}>
      <h2 id="login-title">Login</h2>

      {/* Display Name - input & submit */}
      <label>Name (optional)</label>
      <input
        type="text"
        id="display-name"
        name="display-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        minLength={3}
      />

      {/* Phone Number - input, verify & submit */}
      <label>Phone number</label>
      <input
        type="tel"
        id="phone-number"
        name="phone-number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        maxLength={10}
        required
      />
      {!expandForm ? (
        <>
          <button id="get-otp-btn" type="submit">
            Get OTP
          </button>
        </>
      ) : (
        <>
          <label>One Time Password</label>
          <input
            type="tel"
            id="otp-code"
            name="otp-code"
            value={OTP}
            onChange={verifyOTP}
            maxLength={6}
            required
          />
        </>
      )}

      <div className="response-message">{responseMessage}</div>

      {/* Element for reCAPTCHA widget */}
      <div id="recaptcha-container"></div>
    </form>
  );
}

export default Login;
