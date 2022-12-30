import React, { useEffect, useState } from "react";
import Context from "./context";
import axios from "axios";

const ContextProvider = (props) => {
  const [questions, setQuestions] = useState(null);
  const [language, setLanguage] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {}, [questions]);

  useEffect(() => {
    const fetchData = async () => {
      let ques;

      await axios
        .get(`https://albiruni.ratina.io/fetch_questions`)
        .then((res) => {
          // setInterval(() => {
          //   console.log("wait");
          // }, 1);
          console.log(res.data);
          setQuestions(res.data);
          ques = res.data;
        });

      const qAddNum = [];
      ques.forEach((q) => {
        if (q.name.split("_").includes("sum")) {
          qAddNum.push(q);
        }
      });
      const levelSPassed = localStorage.getItem("levelPassed");
      if (!levelSPassed) {
        const arr = [
          { name: "addition", number: 0, numberOfLevels: qAddNum.length },
          {
            name: "multiplication",
            number: 0,
            numberOfLevels: ques.length - qAddNum.length,
          },
        ];
        localStorage.setItem("levelPassed", JSON.stringify(arr));
      }
    };
    fetchData();
  }, []);
  const context = {
    questions,
    language,
    setLanguage,
    counter,
  };
  console.log(context);

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
