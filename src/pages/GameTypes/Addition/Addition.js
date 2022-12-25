import React, { useState, useEffect, useContext } from "react";
import { useTimer } from "react-timer-hook";
import Context from "../../../store/context";
import styles from "./Addition.module.css";
import CongratsImg from "../../../assets/images/congrats.png";

import { useNavigate } from "react-router-dom";

function SteadyTimer({ expiryTimestamp, onTimeExpire }) {
  const { seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => onTimeExpire(),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="flex w-40 h-40 justify-center items-center rounded-full"
        style={{ border: "10px solid rgb(240,166,36)" }}
      >
        <h2 className="text-7xl" style={{ color: "rgb(240,166,36)" }}>
          {seconds - 1}
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

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
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
          {seconds}
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

const Game = () => {
  const [steady, setSteady] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [chosenIndex, setChosenIndex] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [pauseGame, setPauseGame] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOn, setGameOn] = useState(true);
  const [messages, setMessages] = useState("second");
  const navigate = useNavigate();
  console.log(messages);

  const context = useContext(Context);
  const { questions } = context;
  const localLang = localStorage.getItem("lang");
  const levelSelected = questions?.find((question) => {
    return question.name == localStorage.getItem("levelSelected");
  });
  const levelNumber = levelSelected?.name.split("_")[3] - 1;
  console.log(levelNumber);
  const numberOfAdds = levelSelected?.name.split("_").includes("3") ? 3 : 2;
  // console.log(numberOfAdds);
  // console.log(levelSelected);

  const startGame = () => {
    setSteady(false);
  };
  const steadyTime = new Date();
  steadyTime.setSeconds(steadyTime.getSeconds() + 4);

  const gameTime = new Date();
  gameTime.setSeconds(gameTime.getSeconds() + 780);

  function goNextQuestion() {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setPauseGame(false);
    setChosenIndex([]);
    setChosenAnswers([]);
  }
  const answerChose = (number, idx) => {
    // const numberExisted = chosenAnswers.some((answer) => answer == number);
    const numberIndexExist = chosenIndex.some((i) => i == idx);

    console.log(numberIndexExist);
    let chosenNumbers;
    if (numberIndexExist) {
      const newAnswers = chosenAnswers.filter((answer) => answer !== number);
      const newIndexArr = chosenIndex.filter((i) => i !== idx);

      setChosenAnswers(newAnswers);
      setChosenIndex(newIndexArr);
      chosenNumbers = newAnswers;
    } else {
      setChosenAnswers([...chosenAnswers, number]);
      setChosenIndex([...chosenIndex, idx]);
      chosenNumbers = [...chosenAnswers, number];
    }
    console.log(chosenNumbers);

    if (chosenIndex.length === 0) {
      setChosenIndex([idx]);
      setChosenAnswers([number]);
      return;
    }
    setChosenAnswers([...chosenAnswers, number]);
    // const chosenNumbers = [...chosenAnswers, number];

    if (chosenNumbers.length === numberOfAdds) {
      //تم الضغط على رقم مختلف
      setChosenIndex([...chosenIndex, idx]);
      setChosenAnswers([...chosenAnswers, number]);
      setPauseGame(true);
      const answers = [...chosenAnswers, number];
      const answer = answers.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        0
      );

      //   اجابة صحيحة
      if (
        answer ==
        levelSelected.questions[currentQuestionNumber]?.question_as_number
      ) {
        setCorrectAnswers(correctAnswers + 1);
        console.log(correctAnswers);
      }

      if (currentQuestionNumber + 1 < levelSelected.questions?.length) {
        setTimeout(() => {
          goNextQuestion();
        }, 500);
      } else {
        console.log(correctAnswers);
        if (correctAnswers >= 6) {
          const localLevelPassed = JSON.parse(
            localStorage.getItem("levelPassed")
          );
          const currentQuestionType = localStorage.getItem("questionType");
          const newArr = localLevelPassed.map((item) => {
            if (item.name === currentQuestionType) {
              console.log(item.number, levelNumber);
              if (item.number > levelNumber) {
                console.log("zed");
                return item;
              }
              console.log("zed2");
              return { ...item, number: item.number + 1 };
            }
            return item;
          });
          console.log(newArr);
          localStorage.setItem("levelPassed", JSON.stringify(newArr));
        }
        const m = messagesLabels.find((i) => correctAnswers >= i.id);
        console.log(m);
        setMessages(m);
        setGameOn(false);
      }

      return;
    }
    if (chosenIndex.length === 1 && chosenIndex.some((i) => i === idx)) {
      //تم الضغط على نفس الرقم
      setChosenIndex([]);
      setChosenAnswers([]);
      return;
    }
  };
  return (
    <div
      className={`h-screen p-8 pb-16 relative ${styles.questionsCon}`}
      style={{ backgroundColor: "rgb(244 236 225)" }}
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
              className={`text-center text-9xl ${
                localLang == "ar" ? "arl" : "enl"
              } mb-16`}
            >
              {
                localLang == "ar"
                  ? levelSelected?.questions[currentQuestionNumber]?.ar.label
                  : levelSelected?.questions[currentQuestionNumber]?.en.label
                // levelSelected.questions[currentQuestionNumber]
                //   .question_as_number
              }
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-8 gap-y-20">
              {levelSelected?.questions[currentQuestionNumber]?.options.map(
                (number, idx) => {
                  const chosen = chosenIndex.some((item) => item === idx);
                  const color = chosen ? "rgb(42,87,128)" : "rgb(240,166,36)";
                  return (
                    <div key={idx} className="">
                      <div
                        className={`relative cursor-pointer h-24 w-24 duration-200 rounded-full mx-auto flex justify-center items-center 
                      ${chosen && "-rotate-90"}`}
                        style={{ backgroundColor: color }}
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
                          {number}
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
                  className="h-4 flex-1 rounded-lg duration-200"
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
            <div className="z-10">
              <h2
                className={`${
                  localLang == "ar" ? "arl" : "enl"
                } text-7xl font-semibold mb-2`}
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
