import About from "./components/About/About";
import Get from "./components/Get/GetUsers";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <About />
      <Get />
      <Post />
    </>
  );
};

export default App;
