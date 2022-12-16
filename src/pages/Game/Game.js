import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Game.module.css";

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

const DUMMY_DATA = [
  {
    question: "9",
    choices: ["1", "2", "3", "4", "5", "6", "8", "7", "9", "13"],
  },
  {
    question: "13",
    choices: ["1", "2", "3", "4", "5", "6", "8", "7", "9", "13"],
  },
  {
    question: "20",
    choices: ["1", "2", "3", "11", "5", "6", "17", "19", "9", "15"],
  },
  {
    question: "9",
    choices: ["1", "2", "3", "4", "5", "6", "8", "7", "9", "13"],
  },
  {
    question: "13",
    choices: ["1", "2", "3", "4", "5", "6", "8", "7", "9", "13"],
  },
  {
    question: "20",
    choices: ["1", "2", "3", "11", "5", "6", "17", "19", "9", "15"],
  },
  {
    question: "9",
    choices: ["1", "2", "3", "4", "5", "6", "8", "7", "9", "13"],
  },
  {
    question: "13",
    choices: ["1", "2", "3", "4", "5", "6", "8", "7", "9", "13"],
  },
  {
    question: "20",
    choices: ["1", "2", "3", "11", "5", "6", "17", "19", "9", "15"],
  },
];

const Game = () => {
  const [steady, setSteady] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [chosenIndex, setChosenIndex] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [pauseGame, setPauseGame] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const startGame = () => {
    setSteady(false);
  };
  const steadyTime = new Date();
  steadyTime.setSeconds(steadyTime.getSeconds() + 4);

  const gameTime = new Date();
  gameTime.setSeconds(gameTime.getSeconds() + 30);

  function goNextQuestion() {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setPauseGame(false);
    setChosenIndex([]);
    setChosenAnswers([]);
  }
  const answerChose = (number, idx) => {
    if (chosenIndex.length === 0) {
      setChosenIndex([idx]);
      setChosenAnswers([number]);
      return;
    }
    if (chosenIndex.length === 1 && chosenIndex.some((i) => i !== idx)) {
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
      if (answer == DUMMY_DATA[currentQuestionNumber].question) {
        setCorrectAnswers(correctAnswers + 1);
        console.log(correctAnswers);
      }

      if (currentQuestionNumber + 1 < DUMMY_DATA.length) {
        setTimeout(() => {
          goNextQuestion();
        }, 500);
      } else {
        alert(
          `you have correctly answered ${correctAnswers} of ${DUMMY_DATA.length}`
        );
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
      className={`lg:h-screen p-8 pb-16 relative ${styles.questionsCon}`}
      style={{ backgroundColor: "rgb(244 236 225)" }}
    >
      {steady && (
        <SteadyTimer expiryTimestamp={steadyTime} onTimeExpire={startGame} />
      )}
      {!steady && (
        <div className="fadeIn relative">
          <GameTimer
            expiryTimestamp={gameTime}
            onTimeExpire={() => {
              alert("انتهى الوقت سيتم البدء من جديد");
              setSteady(true);
            }}
            currentQuestionNumber={currentQuestionNumber}
            pauseGame={pauseGame}
          ></GameTimer>
          <div>
            <h2 className="text-center text-9xl enl mb-16">
              {DUMMY_DATA[currentQuestionNumber].question}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-8 gap-y-20">
              {DUMMY_DATA[currentQuestionNumber].choices.map((number, idx) => {
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
              })}
            </div>
          </div>
          <div className="fixed z-20 w-full px-8 bottom-8 left-0 flex gap-1  overflow-hidden">
            {DUMMY_DATA.map((item, idx) => {
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
    </div>
  );
};

export default Game;
