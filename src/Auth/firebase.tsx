  import { initializeApp } from "firebase/app";
  import {
      GoogleAuthProvider,
      getAuth,
      signInWithPopup,
      signOut,
      setPersistence, browserLocalPersistence
    } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_apiKey,
    authDomain: import.meta.env.VITE_APP_authDomain,
    projectId: import.meta.env.VITE_APP_projectId,
    storageBucket: import.meta.env.VITE_APP_storageBucket,
    messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
    appId: import.meta.env.VITE_APP_appId,
    measurementId: import.meta.env.VITE_APP_measurementId
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 setPersistence(auth, browserLocalPersistence).then(() => {
   console.log("Persistence set successfully");
 })
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  export {
      auth,
      provider,
      signInWithPopup,
      signOut,
      db
    };