import React from "react";
import "./About.scss";

const About: React.FC = () => {
  const scrollToPostSection = () => {
    const element = document.getElementById("post-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="about">
      <div className="about__content">
        <h1 className="about__title">
          Test assignment for front-end developer
        </h1>
        <p className="about__description">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button
          className="about__button button--primary"
          onClick={scrollToPostSection}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default About;
