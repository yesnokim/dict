import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import "./ResultTable.scss";

const ResultTable = ({ quizSet, quizResult }) => {
  const getTable = () => {
    const header = (
      <TableHead>
        <TableRow>
          <TableCell className="header_cell">문제번호</TableCell>
          <TableCell className="header_cell">채점결과</TableCell>
          <TableCell className="header_cell">정답</TableCell>
        </TableRow>
      </TableHead>
    );
    const rows = [];
    let quizNum = 1;
    for (let [key, value] of quizResult.entries()) {
      rows.push(
        <TableRow>
          <TableCell className={!value ? "wrong" : "correct"}>{quizNum++}</TableCell>
          <TableCell className={!value ? "wrong" : "correct"}>
            {!!value ? "O" : "X"}
          </TableCell>
          <TableCell className={!value ? "wrong" : "correct"}>
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
