import React from "react";
import AnswerBox from "../answerBox/answerBox";
import "./sentence.scss";

const ImageSet = ["ayun_ski.jpg", "ian_ski.jpg"];
const QuizCount = 5;

const Sentence = ({ quiz, count, correct, correctCount, quizStart, onResult }) => {

  const checkFinish = () => {
    return count > QuizCount - 1;
  };

  if (!quizStart) return <div className="hello">안녕?</div>;
  if (quizStart && checkFinish())
    return <div className="finish_quiz">문제를 모두 풀었어!</div>;

  const getMyScore = () => {
    if (count < 1) return 0;

    const score = Math.round((correctCount * 100) / count).toFixed(0);
    return score;
  };

  return (
    <>
      <div variant="elevation">
        <img
          className="title_image"
          src={correct ? ImageSet[0] : ImageSet[1]}
          alt=""
        />
        <div key={"quiz_box_num_" + count} className="quiz_box">
          <div className="quizSentence">{quiz.sentence}</div>
          <div className="quizKorean">{quiz.korean}</div>
          <div className="answer_box">
            <AnswerBox rightAnswer={quiz.answer} onResult={onResult} />
          </div>
        </div>
      </div>
      <div className="score">
        <div className={correct ? "correct" : "wrong"}>
          {correct
            ? "잘했어!"
            : correct === false
              ? "더 생각해 볼래?"
              : "정답을 써봐"}
        </div>
        {count > 0 && (
          <div className="my_score">{`지금 너의 점수는 ${getMyScore()}점이야! ( ${count}문제 풀었음 / 총 ${QuizCount}문제)`}</div>
        )}
      </div>
    </>
  );

};

export default Sentence;
