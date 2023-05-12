import { RecaptchaVerifier } from "firebase/auth";

export const generateRecaptcha = (auth) => {
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
    return window.recaptchaVerifier;
};