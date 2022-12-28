import React, { useState, useEffect, useContext } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { shuffleQuestions } from "../../../helpers";

import { useTimer } from "react-timer-hook";
import Context from "../../../store/context";
import styles from "./Addition.module.css";
import CongratsImg from "../../../assets/images/congrats.png";
import ArrowImg from "../../../assets/images/arrow-right.png";
import { ReactComponent as ClappingSvg } from "../../../assets/images/clapping.svg";
import { ReactComponent as Dizzy } from "../../../assets/images/Dizzy face-bro.svg";

import { useNavigate } from "react-router-dom";

function convertToArabic(number) {
  const numberArArray = Array.from(String(number), Number);

  const numAr = numberArArray.map((item, index) => {
    if (arabicNumbers[Number(item) - 1]) {
      return arabicNumbers[Number(item) - 1];
    } else {
      return arabicNumbers[9];
    }
  });
  // console.log(numAr);
  return numAr.join("");
}

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
    time.setSeconds(time.getSeconds() + 20);
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
  { label: "انت مبدع", id: 8, timeOut: false },
  { label: "احسنت", id: 6, timeOut: false },
  { label: "حاول مرة أخرى", id: 0, timeOut: false },
];
const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
console.log(arabicNumbers[1]);

const Game = () => {
  const [steady, setSteady] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(8);
  const [chosenIndex, setChosenIndex] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [pauseGame, setPauseGame] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(1);
  const [gameOn, setGameOn] = useState(true);
  const [messages, setMessages] = useState("second");
  const [correctAnswerConfirmed, setCorrectAnswerConfirmed] = useState(false);
  const [check, setCheck] = useState(false);
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
  const levelNumber = levelSelected?.name.split("_")[3] - 1;
  const numberOfAdds = levelSelected?.name.split("_").includes("3") ? 3 : 2;
  console.log(levelNumber);
  console.log(levelSelected?.questions);

  const startGame = () => {
    setSteady(false);
  };
  const steadyTime = new Date();
  steadyTime.setSeconds(steadyTime.getSeconds() + 4);

  console.log(
    levelNumber + 1 > localLevelPassedCurrentType.number &&
      localLevelPassedCurrentType.numberOfLevels !== 1 + levelNumber
  );

  const gameTime = new Date();
  gameTime.setSeconds(gameTime.getSeconds() + 9000);

  function goNextQuestion() {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setPauseGame(false);
    setChosenIndex([]);
    setChosenAnswers([]);
    setCorrectAnswerConfirmed(false);
    setCheck(false);
  }
  const answerChose = (number, idx) => {
    const numberIndexExist = chosenIndex.some((i) => i == idx);

    let chosenNumbers;

    if (numberIndexExist) {
      const newAnswers = chosenAnswers.filter((answer) => answer !== number);
      const newIndexArr = chosenIndex.filter((i) => i !== idx);

      setChosenAnswers(newAnswers);
      setChosenIndex(newIndexArr);
      chosenNumbers = newAnswers;
    } else if (chosenAnswers.length !== numberOfAdds) {
      setChosenAnswers([...chosenAnswers, number]);
      setChosenIndex([...chosenIndex, idx]);
      chosenNumbers = [...chosenAnswers, number];
    }

    if (chosenNumbers.length === numberOfAdds) {
      // setPauseGame(true);
      const answer = chosenNumbers.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        0
      );

      //   اجابة صحيحة
      // if (
      //   answer ==
      //   levelSelected.questions[currentQuestionNumber]?.question_as_number
      // ) {
      //   setCorrectAnswers(correctAnswers + 1);
      // }

      // if (currentQuestionNumber + 1 < levelSelected.questions?.length) {
      //   setTimeout(() => {
      //     goNextQuestion();
      //   }, 500);
      // } else {
      //   if (correctAnswers >= 6) {
      //     const localLevelPassed = JSON.parse(
      //       localStorage.getItem("levelPassed")
      //     );

      //     const newArr = localLevelPassed.map((item) => {
      //       if (item.name === currentQuestionType) {
      //         if (item.number > levelNumber) {
      //           return item;
      //         }
      //         return { ...item, number: item.number + 1 };
      //       }
      //       return item;
      //     });
      //     localStorage.setItem("levelPassed", JSON.stringify(newArr));
      //   }
      //   const m = messagesLabels.find((i) => correctAnswers >= i.id);
      //   setMessages(m);
      //   setGameOn(false);
      // }
    }
  };
  const answerConfirmed = () => {
    setCheck(true);
    const answer = chosenAnswers.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0
    );
    console.log(correctAnswers);
    if (
      answer ===
      levelSelected.questions[currentQuestionNumber]?.question_as_number
    ) {
      setCorrectAnswerConfirmed(true);
      setCorrectAnswers(correctAnswers + 1);
    }
    if (currentQuestionNumber + 1 < levelSelected.questions?.length) {
      setTimeout(() => {
        goNextQuestion();
      }, 1000);
    } else {
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
      const m = messagesLabels.find((i) => correctAnswers >= i.id);
      setMessages(m);

      console.log(m);
      setGameOn(false);
    }
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
            expiryTimestamp={gameTime}
            onTimeExpire={() => {
              setGameOn(false);
              setMessages({ label: "انتهى الوقت", timeOut: true });
            }}
            currentQuestionNumber={currentQuestionNumber}
            pauseGame={pauseGame}
          ></GameTimer>
          <div>
            <h2
              className={`text-center text-6xl ${
                localLang == "ar" ? "arl" : "enl"
              } mb-16`}
            >
              {localLang == "ar"
                ? `أجد مكونات العدد (${convertToArabic(
                    levelSelected?.questions[currentQuestionNumber]
                      ?.question_as_number
                  )})`
                : `Find sums of  (${levelSelected?.questions[currentQuestionNumber]?.question_as_number})`}
            </h2>
            {chosenAnswers.length === numberOfAdds && (
              <div
                onClick={answerConfirmed}
                className="absolute top-3 right-8 cursor-pointer animate-bounce"
              >
                <img className="w-20" src={ArrowImg} alt="" />
              </div>
            )}
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
            {!messages.timeOut && messages.label !== "حاول مرة أخرى" && (
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
                {messages.label}
              </h2>
              {!messages.timeOut && (
                <h6
                  className={`${
                    localLang == "ar" ? "arl" : "enl"
                  } text-center  text-slate-700`}
                >
                  لقد جاوبت على
                  {correctAnswers}/ {levelSelected.questions.length}
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
                    لقد أتممت جميع المستويات وحصلت على لقب البيرونى الصغير{" "}
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
                    لقد تم فتح مستوى جديد
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
                    navigate("/");
                  }}
                >
                  الرئيسية
                </button>
                {messages.timeOut || messages.label == "حاول مرة أخرى" ? (
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
                      setGameOn(true);
                      setSteady(true);
                    }}
                  >
                    حاول مرة أخرى
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
