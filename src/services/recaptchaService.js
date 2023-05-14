import { RecaptchaVerifier } from "firebase/auth";

export const generateRecaptcha = (auth) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    },
    auth
  );
  return recaptchaVerifier;
};

// export const resetRecaptcha = () => {
//   window.recaptchaVerifier.reset();
// };
