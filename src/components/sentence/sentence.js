import {
  Button,
  Card,
  Table,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
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

  const getRandomQuiz = () => {
    const max = QuizSet.length;
    let rand_id = Math.floor(Math.random() * max);

    while (prevIds.includes(rand_id)) {
      rand_id = Math.floor(Math.random() * max);
    }
    setPrevIds([...prevIds, rand_id]);
    return QuizSet[rand_id];
  };

  const makeQuiz = () => {
    const problemJson = getRandomQuiz();

    let regex = new RegExp("(" + problemJson.dict + ")", "gi");
    const sentence = problemJson.sentence.replace(regex, (m) =>
      Array(m.length).join("_")
    );
    const korean = problemJson.korean;
    const answer = problemJson.dict.toLowerCase();
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

  const getQuizResultListTable = () => {
    const header = (
      <TableHead>
        <TableRow>
          <TableCell>문제번호</TableCell>
          <TableCell>채점결과</TableCell>
          <TableCell>정답</TableCell>
        </TableRow>
      </TableHead>
    );
    const rows = [];
    let quizNum = 1;
    for (let [key, value] of quizResult.entries()) {
      rows.push(
        <TableRow>
          <TableCell className={!value ? "wrong" : ""}>{quizNum++}</TableCell>
          <TableCell className={!value ? "wrong" : ""}>
            {!!value ? "O" : "X"}
          </TableCell>
          <TableCell className={!value ? "wrong" : ""}>
            {QuizSet[key].dict}
          </TableCell>
        </TableRow>
      );
    }

    return (
      <Table>
        {header}
        {rows}
      </Table>
    );
  };

  const getQuizResult = () => {
    return (
      <>
        <div className="my_score">{`너의 점수는 ${myScore}점이야! (${correctCount}/${count})`}</div>
        {getQuizResultListTable()}
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
        <div className="title">아윤이의 영어 공부</div>
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
