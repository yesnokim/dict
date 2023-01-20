import { Divider } from '@mui/material'
import React from 'react'
import ResultTable from '../ResultTable/ResultTable'
import "./Result.scss"

const Result = ({ myScore, correctCount, count, quizBank, quizResult }) => {

    return <div className='bg'>
        <div className="my_score">{`너의 점수는 ${myScore}점이야! (${correctCount}/${count})`}</div>
        <Divider />
        <ResultTable quizSet={quizBank} quizResult={quizResult} />
    </div>
}

export default Result