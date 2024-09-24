import { auth, provider, signInWithPopup, signOut } from "./firebase";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in with Google:", result.user);
  } catch (error) {
    console.error(error);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error(error);
  }
};

export { signInWithGoogle, logOut };