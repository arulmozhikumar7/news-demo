import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Import User type
import useStore from "./Context/Store";

import {Route, Routes } from "react-router-dom";
import { router } from "./Config/config";
import News from "./Components/News";
import Search from "./Components/Search";

const App = () => {
  const { setUser } = useStore();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, [setUser]); 
  return (
    <>
    
    <Navbar />

    <Routes>
      {router.map((route) => (
        <Route key={route.key} path={route.path} element={<News category={route.category} country={"india"} />} />
      ))}
        <Route path="/search/:query" element={<Search query={window.location.pathname.split("/search/")[1]} />} />
    </Routes>
    </>
  );
};

export default App;
