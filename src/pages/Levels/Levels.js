import React, { useState, useContext } from "react";
import Context from "../../store/context";
import { useNavigate } from "react-router-dom";
import ContextProvider from "../../store/ContextProvider";

import ills1 from "../../assets/images/ills (1).png";
import ills2 from "../../assets/images/ills (2).png";

import { ReactComponent as LockIcon } from "../../assets/icons/icons8-lock.svg";

const colors = [
  {
    bg: "rgba(240,166,36,0.3)",
    color: "rgb(240,166,36)",
  },
  {
    bg: "rgba(42,87,128,0.3)",
    color: "rgb(42,87,128)",
  },
  {
    bg: "rgba(178,87,85,0.3)",
    color: "rgb(178,87,85)",
  },
  {
    bg: "rgba(145,181,119,0.3)",
    color: "rgb(145,181,119)",
  },
];
const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
console.log(arabicNumbers);
const levelsLabels = [
  {
    ar: "المستوى الأول",
    en: "level 1",
  },
  {
    ar: "المستوى الثانى",
    en: "level 2",
  },
  {
    ar: "المستوى الثالث",
    en: "level 3",
  },
  {
    ar: "المستوى الرابع",
    en: "level 4",
  },
];

const languageSets = [
  {
    type: "multiplication",
    ar: "ضرب الأعداد وقسمتها",
    en: "Multiplication and division",
  },
  {
    type: "addition",
    ar: "جمع الأعداد وطرحها",
    en: "Addition and Subtraction",
  },
];

const Levels = () => {
  const contextStore = useContext(Context);
  const { questions } = contextStore;

  console.log(contextStore);
  const localLang = localStorage.getItem("lang");
  const localLevelType = localStorage.getItem("questionType");
  const localLevelPassed = JSON.parse(localStorage.getItem("levelPassed")).find(
    (item) => item.name == localLevelType
  );

  console.log(questions);
  // console.log(levelsType);
  const levelSelected = languageSets.find((set) => set.type == localLevelType);
  // console.log(levelSelected);

  const levelsDetected = [];
  questions?.forEach((question, idx) => {
    const type = localLevelType == "addition" ? "sum" : "multiply";
    const bool = question.name.split("_").includes(type);
    if (bool) {
      levelsDetected.push(question);
    }
  });
  // console.log(levelsDetected);
  const navigate = useNavigate();

  const [fadeOutAnim, setFadeOutAnim] = useState(false);
  const ChangePage = () => {
    setFadeOutAnim(true);
    setTimeout(() => {
      navigate(`/${localLevelType}`);
    }, 400);
  };

  return (
    <div
      dir="rtl"
      className={`fadeIn flex p-8  ${fadeOutAnim ? "fadeOut" : ""}`}
      style={{ backgroundColor: "rgb(244 236 225)" }}
    >
      <div className=" p-4 relative lg:w-1/2 mx-auto">
        <img
          className="absolute top-0 left-0 w-40 opacity-50 "
          src={localLevelType == "addition" ? ills1 : ills2}
          alt=""
        />
        <h2
          className={`${
            localLang == "ar" ? "arl" : "enl"
          }  text-2xl text-center mb-6 font-semibold`}
        >
          {localLang == "ar" ? levelSelected.ar : levelSelected.en}
        </h2>
        {levelsDetected.map((level, idx) => {
          console.log(level);
          const bgColor =
            idx - 1 < localLevelPassed.number
              ? colors[idx].bg
              : "rgba(67, 66, 66,0.3)";
          const color =
            idx - 1 < localLevelPassed.number
              ? colors[idx].color
              : "rgb(67, 66, 66)";
          return (
            <div
              className="flex relative items-center gap-4 mb-8 p-6 rounded cursor-pointer"
              style={{ backgroundColor: bgColor }}
              onClick={() => {
                if (idx < localLevelPassed.number + 1) {
                  localStorage.setItem("levelSelected", level.name);
                  ChangePage();
                } else {
                  alert("يجب عليك اجتياز المستويات السابقة");
                }
              }}
              key={idx}
              disabled={true}
            >
              <div
                className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
                style={{ backgroundColor: color }}
              >
                {localLang == "ar" ? arabicNumbers[idx] : idx + 1}
              </div>
              <div className="flex-1 text-center">
                <h2
                  className={`arl font-semibold text-xl`}
                  style={{ color: color }}
                >
                  {localLang == "ar"
                    ? levelsLabels[idx].ar
                    : levelsLabels[idx].en}
                </h2>
              </div>
              {idx > localLevelPassed.number && (
                <LockIcon width={"2rem"}></LockIcon>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Levels;
