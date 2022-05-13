import React, { useEffect, useState } from "react";
import BoardCell from "./BoardCell";
import "../styles/BoardStyle.css";
import { CellModel } from "../Models/Simulation";

export enum State {
  Empty,
  Ship,
  Crashed,
}

interface BoardComponentProps {
  shipsLocations: Array<CellModel>|undefined;
}

function BoardComponent(props: BoardComponentProps) {
  const [cells, setCells] = useState<Array<Array<State>>>(createEmptyBoard());

  function createEmptyBoard() {
    var temp: Array<Array<State>> = [];
    for (var i = 0; i < 10; i++) {
      var row: Array<State> = [];
      for (var j = 0; j < 10; j++) {
        row = [...row, State.Empty];
      }
      temp = [...temp, row];
    }
    return temp;
  }

  useEffect(() => {
    if(props.shipsLocations === undefined) return;
    var temp = createEmptyBoard();
    props.shipsLocations.forEach((cell: CellModel) => {
      temp[cell.row][cell.column] = State.Ship;
    });
    setCells(temp);
  }, [props.shipsLocations]);

  return (
    <div className="board">
      {cells.map((row: Array<State>, rowIndex: number) => (
        <div className="boardRow" key={rowIndex}>
          {row.map((cell: State, colIndex) => (
            <BoardCell key={rowIndex + "" + colIndex} state={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BoardComponent;
