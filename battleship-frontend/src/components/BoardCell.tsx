import { State } from "./BoardComponent";
import "../styles/BoardStyle.css"

interface BoardCellProps {
  state: State;
}

function BoardCell(props: BoardCellProps) {
  return (
    <div
      className={
        "cell" +
        (props.state === State.Ship ? " cellShip" : "") +
        (props.state === State.Crashed ? " cellCrashed" : "")
      }
    >
      {props.state === State.Crashed && <p>X</p>}
      </div>
  );
}

export default BoardCell;
