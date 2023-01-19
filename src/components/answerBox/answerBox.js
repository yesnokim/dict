import { TextField } from "@mui/material";
import React, { useState } from "react";

const AnswerBox = ({ rightAnswer, onResult }) => {
  const [yourAnswer, setYourAnswer] = useState("");

  const handleAnswerChanged = (e) => {
    console.log("handleAnsserChanged", e.target.value, rightAnswer);
    if (!rightAnswer) return "";

    setYourAnswer(e.target.value?.trim().toLowerCase());
  };

  const handleAnswerEnter = (e) => {
    if (e.keyCode === 13) {
      onResult(rightAnswer?.trim().toLowerCase() === yourAnswer);
    }
  };
  return (
    <>
      <TextField
        label="여기에 답을 써봐"
        autoFocus={true}
        onChange={handleAnswerChanged}
        onKeyDown={handleAnswerEnter}
        autoComplete="off"
      />
    </>
  );
};

export default AnswerBox;
