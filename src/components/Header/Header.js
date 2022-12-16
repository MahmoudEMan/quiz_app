import React, { useState } from "react";
import HeroImg from "../../assets/images/hero_img.jpg";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
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
      className={`h-screen flex flex-col-reverse lg:flex-row  p-8 ${
        fadeOutAnim ? "fadeOut" : ""
      }`}
    >
      <div
        className="flex-1 flex flex-col items-center justify-center enl"
        style={{}}
      >
        <h1
          className={`text-6xl lg:text-7xl mb-16 arl text-center ${styles.main_title}`}
          style={{
            fontFamily: "'Marhey', cursive",
          }}
        >
          <div style={{ color: "rgb(240,166,36)" }}>ل</div>
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
          <div style={{ color: "rgb(145,181,119)" }}>ر</div>

          {/* لعبة البيرونى الصغير */}
        </h1>
        {/* <p className=" mb-6 arl text-salte-200">لعبة البيرونى الصغير</p> */}

        {!languageSet && (
          <div className="flex  gap-4">
            <button
              className="text-xl py-3 w-40 rounded"
              style={{ backgroundColor: "rgb(255,200,87)" }}
            >
              English
            </button>
            <button
              className="text-xl py-3  w-40 arl font-semibold rounded"
              style={{
                backgroundColor: "rgb(124,153,229)",
              }}
              onClick={() => {
                setLanguageSet(true);
              }}
            >
              عربى
            </button>
          </div>
        )}
        {languageSet && (
          <div className="flex  gap-4 fadeIn">
            <button
              className="text-xl py-3  w-40 arl font-semibold rounded"
              style={{
                backgroundColor: "rgb(124,153,229)",
              }}
            >
              قسمة وضرب
            </button>
            <button
              className="text-xl py-3 w-40 arl rounded font-semibold"
              style={{ backgroundColor: "rgb(255,200,87)" }}
              onClick={ChangePage}
            >
              جمع وطرح
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={HeroImg} alt="" />
      </div>
    </div>
  );
};

export default Header;
