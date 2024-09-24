import { signInWithGoogle, logOut } from "../Auth/Authentication";
import { navs } from "../Config/config";
import useStore from "../Context/Store";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user } = useStore();
  const [query,setQuery] = useState("");
  const countries = ["India", "United States", "Canada", "United Kingdom", "Australia", "Germany"];

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">TECH TITANS</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
         {navs.map((nav, index) => (
           <Link to={nav.path} key={index} className="mr-5 hover:text-gray-900">{nav.name}</Link>
         ))}
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? (window.location.href = `/search/${query}`) : null)}
            className="w-full md:w-1/3 bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search..."
          />
       
        </nav>
        
        
        <div className="relative">
  <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition ease-in-out duration-150">
    <option disabled>Select Country</option>
    {countries.map((country, index) => (
      <option key={index} value={country}>
        {country}
      </option>
    ))}
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5.5 7l4.5 4 4.5-4h-9z" />
    </svg>
  </div>
</div>


        {/* Authentication Button */}
        {user ? (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 ml-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={logOut}
          >
            Log out
          </button>
        ) : (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 ml-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={signInWithGoogle}
          >
            Sign in
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
        {user?.photoURL && (
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
