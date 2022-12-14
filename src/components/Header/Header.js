import React, { useState } from "react";
import HeroImg from "../../assets/images/hero_img.jpg";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [fadeOutAnim, setFadeOutAnim] = useState(false);
  const ChangePage = () => {
    setFadeOutAnim(true);
    setTimeout(() => {
      navigate("/المراحل");
    }, 400);
  };
  return (
    <div className={`h-screen flex p-8 ${fadeOutAnim ? "fadeOut" : ""}`}>
      <div
        className="flex-1 flex flex-col items-center justify-center enl"
        style={{}}
      >
        <h1 className="text-9xl mb-16">
          <span style={{ color: "rgb(240,166,36)" }}>Q</span>
          <span style={{ color: "rgb(42,87,128)" }}>U</span>
          <span style={{ color: "rgb(178,87,85)" }}>I</span>
          <span style={{ color: "rgb(145,181,119)" }}>Z</span>
        </h1>
        {/* <p className=" mb-6 arl text-salte-200">لعبة البيرونى الصغير</p> */}

        <div className="flex gap-4">
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
            onClick={ChangePage}
          >
            عربى
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={HeroImg} alt="" />
      </div>
    </div>
  );
};

export default Header;
