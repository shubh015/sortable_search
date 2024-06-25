import React from "react";
import "./App.css";
import Input from "./components/Input";
import { SkillProvider } from "./context/skillContext";

function App() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Node.JS", "Asp.net"];

  return (
    <>
      <SkillProvider suggestions={skills}>
        <Input />
      </SkillProvider>
    </>
  );
}

export default App;
