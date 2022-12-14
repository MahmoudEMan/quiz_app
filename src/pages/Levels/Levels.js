import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ills1 from "../../assets/images/ills (1).png";
import ills2 from "../../assets/images/ills (2).png";

const Levels = () => {
  const navigate = useNavigate();

  const [fadeOutAnim, setFadeOutAnim] = useState(false);
  const ChangePage = () => {
    setFadeOutAnim(true);
    setTimeout(() => {
      navigate("/الامتحان");
    }, 400);
  };
  return (
    <div
      dir="rtl"
      className={`fadeIn flex p-8 ${fadeOutAnim ? "fadeOut" : ""}`}
      style={{ backgroundColor: "rgb(244 236 225)" }}
    >
      <div className="flex-1 p-4 relative">
        <img className="absolute top-0 left-0 w-40" src={ills1} alt="" />
        <h2 className="arl text-2xl text-center mb-6 font-semibold">
          جمع الأعداد وطرحها
        </h2>
        <div
          className="flex items-center gap-4 mb-8 p-6 rounded cursor-pointer"
          style={{ backgroundColor: "rgba(240,166,36,0.3)" }}
          onClick={ChangePage}
        >
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
            style={{ backgroundColor: "rgb(240,166,36)" }}
          >
            1
          </div>
          <div className="flex-1 text-center">
            <h2 className="arl font-semibold">عددين ناتج جمعهم يساوى ٢٠</h2>
          </div>
        </div>
        <div
          className="flex items-center gap-4 mb-8 p-6 rounded cursor-pointer"
          style={{ backgroundColor: "rgba(42,87,128,0.3)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
            style={{ backgroundColor: "rgb(42,87,128)" }}
          >
            2
          </div>
          <div className="flex-1 text-center">
            <h2 className="arl font-semibold">عددين ناتج جمعهم يساوى ١٠٠</h2>
          </div>
        </div>
        <div
          className="flex items-center gap-4 mb-8 p-6 rounded cursor-pointer"
          style={{ backgroundColor: "rgba(178,87,85,0.3)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
            style={{ backgroundColor: "rgb(178,87,85)" }}
          >
            3
          </div>
          <div className="flex-1 text-center">
            <h2 className="arl font-semibold">
              ثلاث أعداد ناتج جمعهم يساوى ١٠٠
            </h2>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 relative">
        <img className="absolute bottom-0 left-0 w-40" src={ills2} alt="" />
        <h2 className="arl text-2xl text-center mb-6 font-semibold">
          ضرب الأعداد
        </h2>
        <div
          className="flex items-center gap-4 mb-8 p-6 rounded cursor-pointer"
          style={{ backgroundColor: "rgba(240,166,36,0.3)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
            style={{ backgroundColor: "rgb(240,166,36)" }}
          >
            1
          </div>
          <div className="flex-1 text-center">
            <h2 className="arl font-semibold">
              ناتج ضرب عددين (جدول الضرب الى 11)
            </h2>
          </div>
        </div>
        <div
          className="flex items-center gap-4 mb-8 p-6 rounded cursor-pointer"
          style={{ backgroundColor: "rgba(42,87,128,0.3)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
            style={{ backgroundColor: "rgb(42,87,128)" }}
          >
            2
          </div>
          <div className="flex-1 text-center">
            <h2 className="arl font-semibold">
              ناتج ضرب عددين (جدول الضرب من 11 الى 100)
            </h2>
          </div>
        </div>
        <div
          className="flex items-center gap-4 mb-8 p-6 rounded cursor-pointer"
          style={{ backgroundColor: "rgba(178,87,85,0.3)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center text-slate-50"
            style={{ backgroundColor: "rgb(178,87,85)" }}
          >
            3
          </div>
          <div className="flex-1 text-center">
            <h2 className="arl font-semibold">ناتج ضرب ثلاث أعداد</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Levels;
