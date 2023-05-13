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
  const [verificationId, setVerificationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandForm, setExpandForm] = useState(false);

  const countryCode = "+91";
  const navigate = useNavigate();

  // In this function, call 'signInWithPhoneNumber()' method on the 'auth' object with user's phone number as a parameter
  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      const phoneNumberWithCode = countryCode + phoneNumber;
      setExpandForm(true);
      const appVerifier = generateRecaptcha(auth);

      loginWithPhone(auth, phoneNumberWithCode, appVerifier)
        .then((response) => {
          window.confirmationResult = response;
          console.log(
            "OTP SENT SUCCESSFULLY",
            window.confirmationResult,
            response
          );
        })
        .catch((error) => {
          console.log(
            "OTP WAS NOT SENT SUCCESSFULLY. PLEASE TRY AGAIN.",
            error
          );
          setErrorMessage("loginwithphone: " + error);
        });
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

          // redirect to "./blogs" page
          navigate("/posts");
        })
        .catch((error) => {
          setErrorMessage("verifyloginwithphone: " + error);
        });
    }
  };

  return (
    <form id="login-form" onSubmit={requestOTP}>
      <h2 id="login-title">Login</h2>

      {/* Phone Number - input & submit */}
      <label>Display Name</label>
      <input
        type="text"
        id="display-name"
        name="display-name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        minLength={3}
      />
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
        <button id="get-otp-btn" type="submit">
          Get OTP
        </button>
      ) : (
        <>
          <label>One Time Password</label>
          <input
            type="number"
            id="otp-code"
            name="otp-code"
            value={OTP}
            onChange={verifyOTP}
            max={6}
            required
          />
        </>
      )}

      <div>{errorMessage}</div>

      {/* Element for reCAPTCHA widget */}
      <div id="recaptcha-container"></div>
    </form>
  );
}

export default Login;
