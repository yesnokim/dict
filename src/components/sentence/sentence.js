import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import AnswerBox from "../answerBox/answerBox";
import ResultTable from "../result/result";
import "./sentence.scss";

const ImageSet = ["ayun_ski.jpg", "ian_ski.jpg"];
const QuizCount = 5;

const Sentence = () => {
  const [quiz, setQuiz] = useState();
  const [quizStart, setQuizStart] = useState(false);
  const [correct, setCorrect] = useState();
  const [count, setCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [prevIds, setPrevIds] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState(new Map());
  const [quizBank, setQuizBank] = useState([]);

  useEffect(() => {
    fetch("quizSets/w1_w3.json")
      .then((res) => {
        return res.json();
      })
      .then((quiz) => {
        setQuizBank(quiz);
      });
  }, []);

  const getRandomQuiz = () => {
    const max = quizBank.length;
    let rand_id = Math.floor(Math.random() * max);

    while (prevIds.includes(rand_id)) {
      rand_id = Math.floor(Math.random() * max);
    }
    setPrevIds([...prevIds, rand_id]);
    return quizBank[rand_id];
  };

  const makeQuiz = () => {
    const problemJson = getRandomQuiz();

    let regex = new RegExp("(" + problemJson.answer + ")", "gi");
    const sentence = problemJson.sentence.replace(regex, (m) =>
      Array(m.length).join("_")
    );
    const korean = problemJson.korean;
    const answer = problemJson.answer.toLowerCase();
    setQuiz({ sentence, korean, answer });
  };

  const handleNextQuiz = () => {
    makeQuiz();

    setCount((count) => count + 1);
    !!correct && setCorrectCount((correctCount) => correctCount + 1);
    setCorrect(undefined);
  };

  const handleShowResult = () => {
    setMyScore(getMyScore());
    setShowResult(true);
  };

  const OnResult = (isCorrect) => {
    console.log("handleOnResult", isCorrect);
    setCorrect(isCorrect);
    quizResult.set(prevIds[prevIds.length - 1], isCorrect);
  };

  const getMyScore = () => {
    if (count < 1) return 0;

    const score = Math.round((correctCount * 100) / count).toFixed(0);
    return score;
  };

  const handleReset = () => {
    setCount(0);
    setCorrectCount(0);
    setQuiz(0);
    setPrevIds([]);
    setShowResult(false);
    setMyScore(0);
    setQuizStart(false);
    setQuizResult(new Map());
  };

  const getQuizContent = () => {
    if (!quizStart) return <div className="hello">안녕?</div>;
    if (quizStart && checkFinish())
      return <div className="finish_quiz">문제를 모두 풀었어!</div>;

    return (
      <>
        <Card variant="elevation">
          <img
            className="title_image"
            src={correct ? ImageSet[0] : ImageSet[1]}
            alt=""
          />
          <div key={"quiz_box_num_" + count} className="quiz_box">
            <div className="quizSentence">{quiz.sentence}</div>
            <div className="quizKorean">{quiz.korean}</div>
            <div className="answer_box">
              <AnswerBox rightAnswer={quiz.answer} onResult={OnResult} />
            </div>
          </div>
        </Card>
        <div className="score">
          <div className={correct ? "correct" : "wrong"}>
            {correct
              ? "정답!!!"
              : correct === false
              ? "더 고민해 볼래?"
              : "맞춰봐"}
          </div>
          {count > 0 && (
            <div className="my_score">{`지금 너의 점수는 ${getMyScore()}점이야! (${correctCount}/${count})`}</div>
          )}
        </div>
      </>
    );
  };

  const getQuizResult = () => {
    return (
      <>
        <div className="my_score">{`너의 점수는 ${myScore}점이야! (${correctCount}/${count})`}</div>
        <ResultTable quizSet={quizBank} quizResult={quizResult} />
      </>
    );
  };

  const checkFinish = () => {
    return count > QuizCount - 1;
  };

  const handleStartQuizClicked = () => {
    setQuizStart(true);
    makeQuiz();
  };

  const NextQuizButton = () =>
    quizStart &&
    !showResult &&
    correct !== undefined && (
      <Button
        className={"quiz_button"}
        disabled={count > 0 && correct === undefined && !checkFinish()}
        variant="contained"
        onClick={handleNextQuiz}
      >
        다음문제
      </Button>
    );

  const ResultButton = () =>
    quizStart &&
    !showResult &&
    checkFinish() && (
      <Button
        className={"quiz_button"}
        variant="contained"
        onClick={handleShowResult}
      >
        결과보기
      </Button>
    );

  const StartButton = () =>
    !quizStart && (
      <Button
        className={"quiz_button"}
        variant="contained"
        onClick={handleStartQuizClicked}
      >
        시작하자
      </Button>
    );

  const RestartButton = () =>
    quizStart &&
    showResult && (
      <Button
        className="reset_button"
        variant="contained"
        onClick={handleReset}
      >
        처음부터 다시 시작!
      </Button>
    );

  return (
    <div className="bg">
      <div className="header">
        <div className="title">아윤이와 이안이의 영어 공부</div>
      </div>
      <div className={`contents ${!quizStart && "contents_hide"}`}>
        {showResult ? getQuizResult() : getQuizContent()}
      </div>

      <div className="footer">
        <div className="button_group">
          <NextQuizButton />
          <ResultButton />
          <StartButton />
          <RestartButton />
        </div>
      </div>
    </div>
  );
};

export default Sentence;
