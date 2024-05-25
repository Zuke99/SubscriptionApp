import React, { useState } from "react";

function Navbar() {
  const [menuIsOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:top-0 border">
      <div className="block bg-black h-12 lg:hidden">
        <div className="flex justify-between">
          <button
            onClick={() => setIsOpen(!menuIsOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <svg
              className={`fill-current mt-3 bg-fontwhite h-3 w-3 ${
                menuIsOpen ? "hidden" : "block"
              }`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <h1 className="text-fontwhite ml-32 font-sans">Welcome</h1>
            <svg
              className={`fill-current bg-fontwhite h-3 w-3 ${
                menuIsOpen ? "block" : "hidden"
              }`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-black absolute w-[100%]">
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            menuIsOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow flex justify-center  ">
            <a
              href="/signin"
              className="block text-fontwhite mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
            >
              Login
            </a>
            <a
              href="/signup"
              className="block text-fontwhite mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
            >
              Sign Up
            </a>
            <a
              href="/view-posts"
              className="block text-fontwhite mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4"
            >
              View Posts
            </a>
          </div>
          <div>
            <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white">
              Click Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
