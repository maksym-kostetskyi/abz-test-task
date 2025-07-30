import React from "react";
import logo from "@/assets/logo.svg";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <div className="header__buttons">
        <button className="header__button button--primary">Users</button>
        <button className="header__button button--primary">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
