import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div
      onClick={toggle}
      className=" relative cursor-pointer w-[42px] h-[24px] border-[1px] p-[2px] border-solid border-[#53c28b70] rounded-[30px] flex justify-between items-center"
    >
      <div className="text-xs">🌙</div>
      <div className="text-xs">🔆</div>
      <div
        className="w-[15px] h-[15px] bg-[#53c28b] rounded-[50%] absolute"
        style={mode === "dark" ? { left: "2px" } : { right: "2px" }}
      ></div>
    </div>
  );
};

export default DarkModeToggle;
