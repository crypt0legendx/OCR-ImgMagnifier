import React from "react";
import Logo from "../../assets/images/logo-veryfi-white-border.png";

const Header = () => {
  return (
    <div className="header">
      <a href="/" className="m-auto mx-0">
        <img src={Logo} className="h-[60px]" alt="logo" />
      </a>
      <div className="title">
        <h1>Veryfi OCR API Demo</h1>
      </div>
    </div>
  );
};

export default Header;
