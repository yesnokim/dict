import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Result from "../../components/Result/Result";
import Sentence from '../../components/sentence/sentence';
import { hideWords } from "../../utils/utils";
import "./QuizPage.scss";

const QuizCount = 5;

const QuizPage = () => {
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
        const sentence = hideWords(problemJson.answer, problemJson.sentence)
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



    const OnResult = (isCorrect) => {
        setCorrect(isCorrect);
        quizResult.set(prevIds[prevIds.length - 1], isCorrect);
    };


    return (
        <div className="bg">
            <div className="header">
                <div className="title">Quiz</div>
            </div>
            <div className={`contents ${!quizStart && "contents_hide"}`}>
                {showResult
                    ? <Result myScore={myScore} correctCount={correctCount} count={count} quizBank={quizBank} quizResult={quizResult} />
                    : <Sentence quiz={quiz} quizStart={quizStart} count={count} quizResult={quizResult} prevIds={prevIds} correctCount={correctCount} onResult={OnResult} correct={correct} />}
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

export default QuizPage;
