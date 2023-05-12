import { updateProfile } from "firebase/auth";

export const updateUserProfile = (currentUser, userName) => {
  try {
    updateProfile(currentUser, {
      displayName: userName,
    });
  } catch (error) {
    throw error;
  }
};
