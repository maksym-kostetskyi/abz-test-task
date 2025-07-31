import React from "react";
import logo from "@/assets/logo.svg";
import "./Header.scss";

const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Logo" />
        <div className="header__buttons">
          <button
            className="header__button button--primary"
            onClick={() => scrollToSection("get-users-section")}
          >
            Users
          </button>
          <button
            className="header__button button--primary"
            onClick={() => scrollToSection("post-section")}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
