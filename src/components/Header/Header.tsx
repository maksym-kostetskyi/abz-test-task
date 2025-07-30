import React from "react";
import logo from "@/assets/logo.svg";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <div className="header__buttons">
        <button className="header__button">Users</button>
        <button className="header__button">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
