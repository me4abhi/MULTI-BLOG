import { useState } from "react";
import "./Login.css";
import { auth } from "../../services/firebaseConfig";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandForm, setExpandForm] = useState(false);

  const countryCode = "+91";
  const navigate = useNavigate();

  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved successfully | allow signInWithPhoneNumber()
          },
        },
        auth
      );
    }
  };

  // In this function, call 'signInWithPhoneNumber()' method on the 'auth' object with user's phone number as a parameter
  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      const phoneNumberWithCode = countryCode + phoneNumber;
      setExpandForm(true);
      generateRecaptcha();

      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumberWithCode, appVerifier)
        .then((response) => {
          window.confirmationResult = response;
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      window.confirmationResult
        .confirm(otp)
        .then((credentials) => {
          const { displayName } = credentials.user;
          console.log(displayName, credentials.user);
          if (displayName === null) {
            const currentUser = auth.currentUser;
            updateProfile(currentUser, {
              displayName: userName,
            })
              .then(() => {
                console.log("Profile Updated");
                console.log(credentials.user);
              })
              .catch((error) => {
                console.log(error);
              });
          }

          // redirect to "./blogs" page
          navigate("/blogs");
        })
        .catch((error) => {
          setErrorMessage(error.message);
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
