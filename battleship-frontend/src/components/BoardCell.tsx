import { State } from "./BoardComponent";
import "../styles/BoardStyle.css";
import { CellModel } from "../Models/CellModel";

interface BoardCellProps {
  state: State;
  onClick?: (e: any, cell: CellModel) => void;
  cell: CellModel;
  showShipLocations: boolean;
}

function BoardCell(props: BoardCellProps) {
  const onClickAction = (e: any) => {
    if (props.onClick !== undefined) {
      props.onClick(e, props.cell);
    }
  };
  return (
    <div
      className={
        "cell" +
        ((props.showShipLocations && props.state === State.Ship) ||
        props.state === State.CrashedShip
          ? " cellShip"
          : "") +
        (props.state === State.Crashed || props.state === State.CrashedShip
          ? " cellCrashed"
          : "")
      }
      onClick={(e: any) => onClickAction(e)}
    >
      {(props.state === State.Crashed || props.state === State.CrashedShip) && (
        <p>X</p>
      )}
    </div>
  );
}

export default BoardCell;
