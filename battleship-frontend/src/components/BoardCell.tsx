import { State } from "./BoardComponent";
import "../styles/BoardStyle.css";

interface BoardCellProps {
  state: State;
}

function BoardCell(props: BoardCellProps) {
  return (
    <div
      className={
        "cell" +
        (props.state === State.Ship || props.state === State.CrashedShip
          ? " cellShip"
          : "") +
        (props.state === State.Crashed || props.state === State.CrashedShip
          ? " cellCrashed"
          : "")
      }
    >
      {(props.state === State.Crashed || props.state === State.CrashedShip) && <p>X</p>}
    </div>
  );
}

export default BoardCell;
