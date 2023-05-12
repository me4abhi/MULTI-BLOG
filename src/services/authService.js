import { signInWithPhoneNumber } from "firebase/auth";

export const loginWithPhone = (auth, phoneNumber, appVerifier) => {
  try {
    const response = signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyLoginWithPhone = (otp) => {
  try {
    const credentials = window.confirmationResult.confirm(otp);
    return credentials;
  } catch (error) {
    throw error;
  }
};
