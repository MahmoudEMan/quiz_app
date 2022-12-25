import React, { useEffect, useState } from "react";
import Context from "./context";
import axios from "axios";

const ContextProvider = (props) => {
  const [questions, setQuestions] = useState(null);
  const [language, setLanguage] = useState("");
  const [levelsPassed, setLevelsPassed] = useState("");

  useEffect(() => {
    const levelSPassed = localStorage.getItem("levelPassed");
    if (levelSPassed) {
      console.log(levelSPassed);
    } else {
      const arr = [
        { name: "addition", number: 0 },
        { name: "multiplication", number: 0 },
      ];
      localStorage.setItem("levelPassed", JSON.stringify(arr));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      axios.get(`https://albiruni.ratina.io/fetch_questions`).then((res) => {
        setQuestions(res.data);
      });
    }
    fetchData();
  }, []);
  const context = {
    questions,
    language,
    setLanguage,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
