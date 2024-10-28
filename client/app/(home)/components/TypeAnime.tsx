"use client";

import {TypeAnimation } from 'react-type-animation'

const TypeAnime = () => {
  return (
    <TypeAnimation
      sequence={["Experienced", 1000, "SkillFull", 2000]}
      wrapper='span'
      cursor={true}
      repeat={Infinity}
      style={{ display: "inline-block", color: "#d3b714" }}
    />
  );
};

export default TypeAnime;
