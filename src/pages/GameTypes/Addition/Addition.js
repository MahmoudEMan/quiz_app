import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { shuffleQuestions, calculator } from "../../../helpers";

import { useTimer } from "react-timer-hook";
import Context from "../../../store/context";
import styles from "./Addition.module.css";
import CongratsImg from "../../../assets/images/yesCartoon.png";
import NextPoint from "../../../assets/images/next_point.png";

import ArrowImg from "../../../assets/images/arrow-right.png";
import { ReactComponent as ClappingSvg } from "../../../assets/images/clapping.svg";
import { ReactComponent as Dizzy } from "../../../assets/images/Dizzy face-bro.svg";

import { useNavigate } from "react-router-dom";

function convertToArabic(number) {
  const numberArArray = Array.from(String(number), Number);

  const numAr = numberArArray.map((item, index) => {
    if (arabicNumbers[Number(item)]) {
      return arabicNumbers[Number(item)];
    } else {
      return ".";
    }
  });
  return numAr.join("");
}

console.log(calculator([3, 4], "addition"));
console.log(calculator([3, 4], "multiplication"));

function SteadyTimer({ expiryTimestamp, onTimeExpire }) {
  const { seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => onTimeExpire(),
  });
  const localLang = localStorage.getItem("lang");
  const currentQuestionType = localStorage.getItem("questionType");
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="flex w-40 h-40 justify-center items-center rounded-full"
        style={{ border: "10px solid rgb(240,166,36)" }}
      >
        <h2 className="text-7xl" style={{ color: "rgb(240,166,36)" }}>
          {localLang == "ar" ? convertToArabic(seconds - 1) : seconds - 1} {}
        </h2>
      </div>
    </div>
  );
}
function GameTimer({
  levelTimer,
  expiryTimestamp,
  onTimeExpire,
  currentQuestionNumber,
  pauseGame,
}) {
  const { seconds, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => onTimeExpire(),
  });
  const localLang = localStorage.getItem("lang");
  const currentQuestionType = localStorage.getItem("questionType");
  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + levelTimer);
    restart(time);
    if (!pauseGame) {
      resume();
    } else {
      pause();
    }
  }, [currentQuestionNumber, pauseGame]);

  return (
    <div
      className="fixed"
      onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 6);
        restart(time);
      }}
    >
      <div
        className="flex w-20 h-20 justify-center items-center rounded-full"
        style={{ border: "5px solid rgb(240,166,36)" }}
      >
        <h2
          className={`text-3xl ${
            seconds < 6 && seconds !== 0 && styles.timeIsRunningOutAnim
          }`}
          style={{ color: "rgb(240,166,36)" }}
        >
          {localLang == "ar" ? convertToArabic(seconds) : seconds}
        </h2>
      </div>
    </div>
  );
}

const messagesLabels = [
  {
    labelAr: "?????? ????????",
    labelEn: "What a genius little bot",
    id: 8,
    timeOut: false,
  },
  { labelAr: "??????????", labelEn: "Well done ", id: 6, timeOut: false },
  {
    labelAr: "???????? ?????? ????????",
    labelEn: "Try again you can do better ",
    id: 0,
    timeOut: false,
  },
];
// const arabicNumbers = ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??"];
const arabicNumbers = ["??", "??", "??", "??", "??", "??", "??", "??", "??", "??"];

const Game = () => {
  const [steady, setSteady] = useState(true);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [chosenIndex, setChosenIndex] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [pauseGame, setPauseGame] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOn, setGameOn] = useState(true);
  const [messages, setMessages] = useState("second");
  const [correctAnswerConfirmed, setCorrectAnswerConfirmed] = useState(false);
  const [check, setCheck] = useState(false);
  const [levelTimer, setLevelTimer] = useState();
  // console.log(typeof levelTimer);

  const navigate = useNavigate();

  const localLang = localStorage.getItem("lang");
  const localLevelPassed = JSON.parse(localStorage.getItem("levelPassed"));
  const currentQuestionType = localStorage.getItem("questionType");
  const localLevelPassedCurrentType = localLevelPassed.find(
    (i) => i.name == currentQuestionType
  );

  const context = useContext(Context);
  const { questions } = context;

  const levelSelected = questions?.find((question) => {
    return question.name == localStorage.getItem("levelSelected");
  });
  if (levelSelected) {
    levelSelected.questions = shuffleQuestions(levelSelected?.questions);
  }
  console.clear();
  console.log(levelSelected?.questions[currentQuestionNumber].answer);

  useEffect(() => {
    async function getLevelTimer() {
      await axios
        .get(`https://albiruni.ratina.io/get_levels_time`)
        .then((res) => {
          setLevelTimer(Number(res.data[levelSelected.name]));
        });
    }
    getLevelTimer();
  }, []);

  const levelNumber = levelSelected?.name.split("_")[3] - 1;
  const numberOfAdds = levelSelected?.name.split("_").includes("3") ? 3 : 2;

  const startGame = () => {
    setSteady(false);
  };
  const steadyTime = new Date();
  steadyTime.setSeconds(steadyTime.getSeconds() + 4);

  const gameTime = new Date();
  gameTime.setSeconds(gameTime.getSeconds() + levelTimer);

  function goNextQuestion() {
    setPauseGame(true);
    if (currentQuestionNumber + 1 < levelSelected.questions?.length) {
      setTimeout(() => {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setPauseGame(false);
        setChosenIndex([]);
        setChosenAnswers([]);
        setCorrectAnswerConfirmed(false);
        setCheck(false);
      }, 1000);
    } else {
      // ???? ???????????????? ???? ??????????????
      if (correctAnswers >= 6) {
        const newArr = localLevelPassed.map((item) => {
          if (item.name === currentQuestionType) {
            if (item.number > levelNumber) {
              return item;
            }
            return { ...item, number: item.number + 1 };
          }
          return item;
        });
        localStorage.setItem("levelPassed", JSON.stringify(newArr));
      }
      if (correctAnswers >= 6) {
        var params = new URLSearchParams();
        params.append("score", "3");
        params.append(
          "answers",
          JSON.stringify([
            {
              name: "sum_sub_level_1",
              questions: [
                {
                  en: {
                    label: "= 19",
                  },
                  ar: {
                    label: "?????????? ?????????? 19",
                  },
                  question_as_number: 19,
                  is_correct: true,
                },
                {
                  en: {
                    label: "= 6",
                  },
                  ar: {
                    label: "?????????? ?????????? 6",
                  },
                  question_as_number: 6,
                  is_correct: false,
                },
              ],
            },
          ])
        );
        axios
          .post("https://albiruni.ratina.io/set_result", params)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      const m = messagesLabels.find((i) => correctAnswers >= i.id);
      setMessages(m);
      setGameOn(false);
    }
  }
  const answerChose = (number, idx) => {
    const numberIndexExist = chosenIndex.some((i) => i == idx);

    if (numberIndexExist) {
      const newAnswers = chosenAnswers.filter((answer) => answer !== number);
      const newIndexArr = chosenIndex.filter((i) => i !== idx);
      setChosenAnswers(newAnswers);
      setChosenIndex(newIndexArr);
    } else if (chosenAnswers.length !== numberOfAdds) {
      setChosenAnswers([...chosenAnswers, number]);
      setChosenIndex([...chosenIndex, idx]);
    }
  };
  const answerConfirmed = () => {
    setCheck(true);
    setPauseGame(true);
    const answer = calculator(chosenAnswers, currentQuestionType);
    if (
      answer ===
      levelSelected.questions[currentQuestionNumber]?.question_as_number
    ) {
      setCorrectAnswerConfirmed(true);
      setCorrectAnswers(correctAnswers + 1);
    }
    console.log(
      answer,
      levelSelected.questions[currentQuestionNumber]?.question_as_number
    );
    goNextQuestion();
  };

  return (
    <div
      className={`  p-8 pb-16 relative ${styles.questionsCon}`}
      style={{ backgroundColor: "rgb(244 236 225)", minHeight: "100vh" }}
    >
      {steady && (
        <SteadyTimer expiryTimestamp={steadyTime} onTimeExpire={startGame} />
      )}
      {!steady && gameOn && (
        <div className="fadeIn relative">
          <GameTimer
            levelTimer={levelTimer}
            expiryTimestamp={gameTime}
            onTimeExpire={() => {
              goNextQuestion();
            }}
            currentQuestionNumber={currentQuestionNumber}
            pauseGame={pauseGame}
          ></GameTimer>
          <div>
            <h2
              dir={localLang == "ar" ? "rtl" : ""}
              className={`text-center text-6xl ${
                localLang == "ar" ? "arl" : "enl"
              } mb-16`}
            >
              {localLang == "ar"
                ? `?????? ???????????? ?????????? 
                (${convertToArabic(
                  levelSelected?.questions[currentQuestionNumber]
                    ?.question_as_number
                )})`
                : `Find sums of  (${levelSelected?.questions[currentQuestionNumber]?.question_as_number})`}
            </h2>
            {chosenAnswers.length === numberOfAdds && (
              <div
                onClick={answerConfirmed}
                className="fixed top-1/2 right-2 cursor-pointer z-50 "
              >
                <img className="w-20" src={ArrowImg} alt="" />
                <h2 className="text-slate-50 absolute top-1/2 right-1/2 -translate-y-1/2 z-50 ">
                  {localLang == "ar" ? "????????????" : "Next"}
                </h2>
              </div>
            )}
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="fixed top-2 left-4 cursor-pointer "
            >
              <BsFillArrowLeftCircleFill
                style={{ width: "2rem", height: "2rem", fill: "#f0a624" }}
              ></BsFillArrowLeftCircleFill>
            </div>
            {correctAnswerConfirmed && (
              <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                <ClappingSvg className="zoomOut"></ClappingSvg>
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-8 gap-y-20">
              {levelSelected?.questions[currentQuestionNumber]?.options.map(
                (number, idx) => {
                  const chosen = chosenIndex.some((item) => item === idx);
                  let color;
                  if (chosen && correctAnswerConfirmed && check) {
                    color = "#91b577";
                  } else if (chosen && !correctAnswerConfirmed && check) {
                    color = "#b25755";
                  } else if (chosen) {
                    color = "rgb(42,87,128)";
                  } else {
                    color = "rgb(240,166,36)";
                  }
                  // chosen &&
                  // correctAnswerConfirmed &&
                  // chosenAnswers.length === numberOfAdds
                  //   ? "rgb(42,87,128)"
                  //   : "rgb(240,166,36)" || "red";
                  let labelNum =
                    localLang === "ar" ? convertToArabic(number) : number;

                  return (
                    <div key={idx} className="">
                      <div
                        className={`relative    cursor-pointer h-24 w-24 duration-200 animate-[wiggle_1s_ease-in-out_alternate]  rounded-full mx-auto flex justify-center items-center  
                       
                      ${chosen && "-rotate-90"}`}
                        style={{
                          backgroundColor: color,
                        }}
                        onClick={() => {
                          answerChose(number, idx);
                        }}
                      >
                        <div
                          className="h-7 w-7 duration-200 rounded-full absolute top-0 right-0"
                          style={{ backgroundColor: color }}
                        ></div>
                        <div
                          className="h-7 w-7 duration-200 rounded-full absolute bottom-0 left-0"
                          style={{ backgroundColor: color }}
                        ></div>
                        <h2
                          className={`text-slate-50 text-2xl 
                        ${chosen && "rotate-90"}`}
                        >
                          {labelNum}
                        </h2>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="fixed z-20 w-full px-8 bottom-8 left-0 flex gap-1  overflow-hidden">
            {levelSelected?.questions?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={`h-4 flex-1 rounded-lg duration-200 `}
                  style={{
                    backgroundColor:
                      currentQuestionNumber + 1 > idx
                        ? "rgb(240,166,36)"
                        : "rgba(240,166,36,0.3)",
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {!gameOn && (
        <div
          className="fixed top-1/2 p-4 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full  "
          style={{ maxWidth: "756px", maxHeight: "400px" }}
        >
          <div className="bg-slate-50 relative h-full flex flex-col p-4 justify-center items-center w-full shadow-lg">
            {!messages.timeOut && messages.id >= 6 && (
              <div className="absolute - opacity-50 right-0 top-0">
                <img src={CongratsImg} alt="" />
              </div>
            )}
            {(messages.id === 0 || messages.timeOut) && (
              <div className="absolute w-60 h-60 opacity-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dizzy></Dizzy>
              </div>
            )}

            <div className="z-10">
              <h2
                className={`${
                  localLang == "ar" ? "arl" : "enl"
                } text-7xl font-semibold mb-2 text-center`}
                style={{ color: "rgb(193,112,97)" }}
              >
                {localLang == "ar" ? messages.labelAr : messages.labelEn}
              </h2>
              {!messages.timeOut && (
                <h6
                  className={`${
                    localLang == "ar" ? "arl" : "enl"
                  } text-center  text-slate-700`}
                >
                  {localLang === "ar"
                    ? " ?????? ?????????? ??????"
                    : " You have answered "}{" "}
                  ?????? ?????????? ??????
                  {localLang === "ar"
                    ? convertToArabic(correctAnswers)
                    : correctAnswers}
                  /
                  {localLang === "ar"
                    ? convertToArabic(levelSelected.questions.length)
                    : levelSelected.questions.length}
                </h6>
              )}

              {messages.id >= 6 &&
                localLevelPassedCurrentType.numberOfLevels ===
                  levelNumber + 1 &&
                localLevelPassedCurrentType.number === levelNumber + 1 && (
                  <h2
                    className={`${
                      localLang == "ar" ? "arl" : "enl"
                    } text-3xl text-center font-semibold mb-2`}
                    style={{ color: "rgb(193,112,97)" }}
                  >
                    {localLang == "ar"
                      ? "?????? ?????????? ???????? ?????????????????? ?????????? ?????? ?????? ???????????????? ????????????"
                      : "You have finished all the levels and earned little bairony title"}
                  </h2>
                )}
              {messages.id >= 6 &&
                levelNumber + 1 == localLevelPassedCurrentType.number &&
                localLevelPassedCurrentType.numberOfLevels !==
                  1 + levelNumber && (
                  <h2
                    className={`${
                      localLang == "ar" ? "arl" : "enl"
                    } text-3xl font-semibold mb-2`}
                    style={{ color: "rgb(193,112,97)" }}
                  >
                    ?????? ???? ?????? ?????????? ????????
                  </h2>
                )}
              <div className="flex gap-4 mt-6 justify-center">
                <button
                  className={`rounded-full py-2 px-4 ${
                    localLang == "ar" ? "arl" : "enl"
                  }`}
                  style={{
                    color: "#fff",
                    backgroundColor: "rgb(193,112,97)",
                  }}
                  onClick={() => {
                    navigate("/??????????????");
                  }}
                >
                  {localLang === "ar" ? "??????????????????" : "Levels"}
                </button>
                {messages.timeOut || messages.id < 6 ? (
                  <button
                    className={`rounded-full py-2 px-4 ${
                      localLang == "ar" ? "arl" : "enl"
                    }`}
                    style={{
                      color: "rgb(193,112,97)",
                      border: "1px solid rgb(193,112,97)",
                    }}
                    onClick={() => {
                      setCurrentQuestionNumber(0);
                      setChosenIndex([]);
                      setChosenAnswers([]);
                      setCorrectAnswers(0);
                      setGameOn(true);
                      setSteady(true);
                      setCorrectAnswerConfirmed(false);
                      setPauseGame(false);
                    }}
                  >
                    ???????? ?????? ????????
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
