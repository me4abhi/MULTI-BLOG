import { useState } from "react";
import "./Login.css";
import { auth } from "../../services/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandForm, setExpandForm] = useState(false);

  const COUNTRY_CODE = "+91";

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        // size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved successfully | allow signInWithPhoneNumber()
        },
      },
      auth
    );
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
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
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
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        const user = result.user;
      }).catch((error) => {

      })
      
    }
  };

  return (
    <form id="login-form" onSubmit={requestOTP}>
      <h2>Login</h2>
      
      {/* Phone Number - input & submit */}
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
            maxLength={6}
            required
          />
          <button style={{ visibility: "hidden" }} id="login-btn" type="submit">
            Login
          </button>
        </>
      )}

      {/* Element for reCAPTCHA widget */}
      <div id="recaptcha-container"></div>

      <div>{errorMessage}</div>
    </form>
  );
}

export default Login;
