import About from "./components/About/About";
import Get from "./components/Get/GetUsers";
import Header from "./components/Header/Header";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <About />
      <Get />
    </>
  );
};

export default App;
