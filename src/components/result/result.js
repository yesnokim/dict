import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import "./result.scss";

const ResultTable = ({ quizSet, quizResult }) => {
  const getTable = () => {
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
            {quizSet[key].answer}
          </TableCell>
        </TableRow>
      );
    }

    return (
      <Table className="result_table" key={"result_table"}>
        {header}
        {rows}
      </Table>
    );
  };

  return <>{getTable()}</>;
};

export default ResultTable;
