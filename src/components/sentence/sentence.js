import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import AnswerBox from "../answerBox/answerBox";
import "./sentence.scss";

const QuizSet = [
  {
    dict: "feet",
    sentence: "Look at the feet! So cute!",
    korean: "발 좀 봐. 너무 귀여워"
  },
  {
    dict: "flower",
    sentence: "Those are flowers.",
    korean: "저것들은 꽃들입니다."
  },
  {
    dict: "bread",
    sentence: "This is my bread.",
    korean: "이것은 나의 빵이다."
  },
  {
    dict: "goodbye",
    sentence: "goodbye, see you tomorrow",
    korean: "잘가, 내일 만나"
  },
  {
    dict: "farmer",
    sentence: "He is a farmer.",
    korean: "그는 농부다."
  },
  {
    dict: "baby",
    sentence: "The baby is small.",
    korean: "그 아기는 작다."
  },
  {
    dict: "brother",
    sentence: "I have two brothers.",
    korean: "나는 두 명의 형제가 있다."
  },
  {
    dict: "chair",
    sentence: "My chair is old.",
    korean: "내 의자가 낡았다."
  },
  {
    dict: "children",
    sentence: "I like children.",
    korean: "난 아이들 좋아해."
  },
  {
    dict: "cow",
    sentence: "My father has seven cows.",
    korean: "아버지는 소 일곱 마리를 가지고 계셔."
  },
  {
    dict: "girl",
    sentence: "The girl is my friend.",
    korean: "그 소녀는 나의 친구이다."
  },
  {
    dict: "bird",
    sentence: "Birds have wings.",
    korean: "새들은 날개를 가지고 있다."
  },
  {
    dict: "egg",
    sentence: "It's an egg.",
    korean: "그것은 달걀이다."
  },
  {
    dict: "birthday",
    sentence: "When is your birthday.",
    korean: "너 생일이 언제니?"
  },
  {
    dict: "chicken",
    sentence: "The chicken is very tasty.",
    korean: "닭은 매우 맛있다."
  }
];

const ImageSet = ["ayun_ski.jpg", "ian_ski.jpg"];

const Sentence = () => {
  const [quiz, setQuiz] = useState();
  const [correct, setCorrect] = useState();
  const [count, setCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const getRandomQuiz = () => {
    const max = QuizSet.length;
    const rand_id = Math.floor(Math.random() * max);
    return QuizSet[rand_id];
  };

  const make_quiz = () => {
    const problemJson = getRandomQuiz();
    let regex = new RegExp("(" + problemJson.dict + ")", "gi");
    const sentence = problemJson.sentence.replace(regex, (m) =>
      Array(m.length).join("_")
    );

    const korean = problemJson.korean;
    const answer = problemJson.dict.toLowerCase();
    setQuiz({ sentence, korean, answer });
  };

  const handleQuizButtonClicked = () => {
    make_quiz();
    setCount((count) => count + 1);
    correct && setCorrectCount((correctCount) => correctCount + 1);
    setCorrect(false);
  };

  const handleOnResult = (isCorrect) => {
    console.log("handleOnResult", isCorrect);
    setCorrect(isCorrect);
  };

  const getMyScore = () => {
    console.log("getMyScore", correctCount, count);
    if (count - 1 < 1) return 0;
    return Math.round((correctCount * 100) / count).toFixed(0);
  };

  const handleQuizReset = () => {
    setCount(0);
    setCorrectCount(0);
    setQuiz(0);
  };

  console.log("count = ", count);

  const myLog = (str) => {
    console.log(str);
  };

  return (
    <>
      <div className="header">
        <div className="title">아윤이의 영어 공부</div>
      </div>
      <div className="contents">
        {!!quiz ? (
          <Card variant="elevation">
            {myLog("card")}
            <img
              src={correct ? ImageSet[0] : ImageSet[1]}
              height="300px"
              alt=""
            />
            <div key={"quiz_box_num_" + quiz?.answer} className="quiz_box">
              <div className="quizSentence">{quiz.sentence}</div>
              <div className="quizKorean">{quiz.korean}</div>
              <div className="answer_box">
                <AnswerBox
                  rightAnswer={quiz.answer}
                  onResult={handleOnResult}
                />
              </div>
            </div>
          </Card>
        ) : (
          <div className="hello">안녕?</div>
        )}
        {count > 0 ? (
          <div className="score">
            {myLog("score")}
            <div className={correct ? "correct" : "wrong"}>
              {correct ? "정답!!!" : "더 고민해 볼래?"}
            </div>
            {count > 1 && (
              <div className="my_score">{`지금 너의 점수는 ${getMyScore()}점이야! (${correctCount}/${count})`}</div>
            )}
          </div>
        ) : null}
      </div>

      <div className="footer">
        <div className="button_group">
          <Button
            className="quiz_button"
            variant="contained"
            onClick={handleQuizButtonClicked}
          >
            {count > 0 ? "다음 문제!" : "시작해보자!"}
          </Button>
          {count > 0 && (
            <Button
              className="reset_button"
              variant="contained"
              onClick={handleQuizReset}
            >
              처음부터 다시 시작!
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sentence;
