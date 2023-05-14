import { getAuth, signOut } from "firebase/auth";
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

export const logout = () => {
  const auth = getAuth();
  try {
    signOut(auth);
  } catch (error) {
    console.log("Unable to logout.");
  }
};
