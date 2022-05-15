import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import BoardCell from "./BoardCell";
import "../styles/BoardStyle.css";
import { CellModel } from "../Models/CellModel";

export enum State {
  Empty,
  Ship,
  Crashed,
  CrashedShip,
}

interface BoardComponentProps {
  shipsLocations: Array<CellModel> | undefined;
  showShipLocations: boolean;
  canMakeMove?: boolean;
  setCanMakeMove?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BoardComponentRef {
  markOpponentsMove: (cell: CellModel) => boolean;
  missedShots: Array<CellModel>;
  successfulShots: Array<CellModel>;
  lastSuccessfulShot: CellModel | null;
  clearBoard: () => void;
}

const BoardComponent = forwardRef(
  (props: BoardComponentProps, ref: Ref<BoardComponentRef>) => {
    const [cells, setCells] = useState<Array<Array<State>>>(createEmptyBoard());
    const [missedShots, setMissedShots] = useState<Array<CellModel>>([]);
    const [successfulShots, setSuccessfulShots] = useState<Array<CellModel>>(
      []
    );
    const [lastSuccessfulShot, setLastSuccessfulShot] =
      useState<CellModel | null>(null);

    useImperativeHandle(ref, () => ({
      markOpponentsMove,
      missedShots,
      successfulShots,
      lastSuccessfulShot,
      clearBoard,
    }));

    function clearBoard() {
      setCells(createEmptyBoard());
      setMissedShots([]);
      setSuccessfulShots([]);
    }

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

    function markOpponentsMove(cell: CellModel): boolean {
      var temp = [...cells];
      if (temp[cell.row][cell.column] === State.Ship) {
        setLastSuccessfulShot(cell);
        setSuccessfulShots([...successfulShots, cell]);
        temp[cell.row][cell.column] = State.CrashedShip;
      } else {
        setLastSuccessfulShot(null);
        setMissedShots([...missedShots, cell]);
        temp[cell.row][cell.column] = State.Crashed;
      }
      setCells(temp);
      return checkIfWasBeaten();
    }

    function checkIfWasBeaten(): boolean{
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          if(cells[i][j]===State.Ship) return false;
        }
      }
      return true;
    }

    function makeYourMoveInGameMode(cell: CellModel) {
      if (props.canMakeMove === undefined || props.canMakeMove === false)
        return;
      if (
        missedShots.filter(
          (c: CellModel) => c.row === cell.row && c.column === cell.column
        ).length !== 0
      )
        return;
      if (
        successfulShots.filter(
          (c: CellModel) => c.row === cell.row && c.column === cell.column
        ).length !== 0
      )
        return;
      markOpponentsMove(cell);
      props.setCanMakeMove!(false);
    }

    useEffect(() => {
      if (props.shipsLocations === undefined) return;
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
              <BoardCell
                key={rowIndex + "" + colIndex}
                state={cell}
                showShipLocations={props.showShipLocations}
                onClick={(e: any, cell: CellModel) =>
                  makeYourMoveInGameMode(cell)
                }
                cell={{ row: rowIndex, column: colIndex } as CellModel}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

export default BoardComponent;
