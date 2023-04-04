import React from "react";
import { Link } from "react-router-dom";

function Navheader() {
  return (
    <div className="w-full h-28">
      <div className="w-4/5 m-auto bg-white flex justify-between items-center py-5 rounded-lg shadow-2xl">
        <div className="logo-color text-3xl contact-border">
        B & P INFORMANTS
        </div>
        <div className="flex justify-between items-center space-x-8 mr-6">
          <div className="logo-color text-3xl contact-border">
          98****7222
          </div>
          <Link to="/register">
            <div className="navheader-btn cursor-pointer">Register</div>
          </Link>
          <Link to="/signin">
            <div className="navheader-btn cursor-pointer">Login</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navheader;
