import React, { useState, useContext } from "react";
import Context from "../../store/context";
import HeroImg from "../../assets/images/hero_img.jpg";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
const Header = () => {
  const contextStore = useContext(Context);
  console.log(contextStore);
  const { language } = contextStore;
  const [languageSet, setLanguageSet] = useState(false);
  const navigate = useNavigate();
  const [fadeOutAnim, setFadeOutAnim] = useState(false);

  const ChangePage = () => {
    setFadeOutAnim(true);
    setTimeout(() => {
      navigate("/المراحل");
    }, 400);
  };
  return (
    <div
      className={` lg:h-screen flex flex-col-reverse lg:flex-row  p-8 ${
        fadeOutAnim ? "fadeOut" : ""
      }`}
    >
      <div
        className="flex-1 flex flex-col items-center justify-center enl"
        style={{}}
      >
        <h1
          className={`text-6xl leading-loose lg:text-7xl mb-16 arl text-center ${styles.main_title}`}
          style={{
            fontFamily: "'Marhey', cursive",
            color: "rgb(178,87,85)",
          }}
        >
          {/* <div style={{ color: "rgb(240,166,36)" }}>ل</div>
          <div style={{ color: "rgb(42,87,128)" }}>ع</div>
          <div style={{ color: "rgb(178,87,85)" }}>ب</div>
          <div style={{ color: "rgb(145,181,119)" }}>ة </div>
          <div style={{ color: "rgb(240,166,36)" }}>ا</div>
          <div style={{ color: "rgb(42,87,128)" }}>ل</div>
          <div style={{ color: "rgb(178,87,85)" }}>ب</div>
          <div style={{ color: "rgb(145,181,119)" }}>ي</div>
          <div style={{ color: "rgb(240,166,36)" }}>ر</div>
          <div style={{ color: "rgb(42,87,128)" }}>و</div>
          <div style={{ color: "rgb(178,87,85)" }}>ن</div>
          <div style={{ color: "rgb(145,181,119)" }}>ي </div>
          <div style={{ color: "rgb(240,166,36)" }}>ال</div>
          <div style={{ color: "rgb(42,87,128)" }}>ص</div>
          <div style={{ color: "rgb(178,87,85)" }}>غ</div>
          <div style={{ color: "rgb(145,181,119)" }}>ي</div>
          <div style={{ color: "rgb(145,181,119)" }}>ر</div> */}
          لعبة البيرونى الصغير
        </h1>
        {/* <p className=" mb-6 arl text-salte-200">لعبة البيرونى الصغير</p> */}

        {!languageSet && (
          <div className="flex w-full lg:w-auto flex-col lg:flex-row  gap-4">
            <button
              className="text-xl py-3 w-full lg:w-40 rounded"
              style={{ backgroundColor: "rgb(255,200,87)" }}
              onClick={() => {
                setLanguageSet(true);
                localStorage.setItem("lang", "en");
                contextStore.setLanguage("en");
              }}
            >
              English
            </button>
            <button
              className="text-xl py-3  w-full lg:w-40 arl font-semibold rounded"
              style={{
                backgroundColor: "rgb(124,153,229)",
              }}
              onClick={() => {
                setLanguageSet(true);
                localStorage.setItem("lang", "ar");

                contextStore.setLanguage("ar");
              }}
            >
              عربى
            </button>
          </div>
        )}
        {languageSet && (
          <div className="flex relative flex-col w-full lg:w-auto lg:flex-row  gap-4 fadeIn">
            <button
              className={`text-xl  py-3 ${
                language == "ar" ? "w-full lg:w-40" : "w-full lg:w-60"
              } arl rounded font-semibold`}
              style={{
                backgroundColor: "rgb(124,153,229)",
              }}
              onClick={() => {
                ChangePage();
                localStorage.setItem("questionType", "multiplication");
              }}
            >
              {language == "ar" ? "قسمة وضرب" : "Multiplication and division "}
            </button>
            <button
              className={`text-xl py-3 ${
                language == "ar" ? "w-full lg:w-40" : "w-full lg:w-60"
              } arl rounded font-semibold`}
              style={{ backgroundColor: "rgb(255,200,87)" }}
              onClick={() => {
                ChangePage();
                localStorage.setItem("questionType", "addition");
              }}
            >
              {language == "ar" ? "جمع وطرح" : "Addition and Subtraction"}
            </button>
            <div
              onClick={() => {
                setLanguageSet(false);
              }}
              className="absolute -top-12 lg:top-1/2 rotate-90 lg:rotate-0  -translate-x-1/2 lg:-translate-y-1/2 left-1/2 lg:-left-12 cursor-pointer "
            >
              <BsFillArrowLeftCircleFill
                style={{ width: "2rem", height: "2rem", fill: "#f0a624" }}
              ></BsFillArrowLeftCircleFill>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={HeroImg} alt="" />
      </div>
      <div>{contextStore.counter}</div>
    </div>
  );
};

export default Header;
