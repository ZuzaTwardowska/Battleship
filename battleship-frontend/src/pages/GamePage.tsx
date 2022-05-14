import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getSimulationConfig } from "../ApiServices/configCreator";
import BoardComponent, {
  BoardComponentRef,
} from "../components/BoardComponent";
import { PlaceShipsInstruction } from "../components/Instructions";
import PlaceShipsBoardComponent from "../components/PlaceShipsBoardComponent";
import { CellModel } from "../Models/Simulation";
import "../styles/SimulationPageStyle.css";

function GamePage() {
  const service = APIservice();
  const board1 = useRef<BoardComponentRef>(null);
  const board2 = useRef<BoardComponentRef>(null);

  const [yourShips, setYourShips] = useState<Array<CellModel>>([]);
  const [eraseMode, setEraseMode] = useState<boolean>(false);

  const clickOnCell = (e: any, cell: CellModel) => {
    e.preventDefault();
    if (!eraseMode) setYourShips([...yourShips, cell]);
    else {
      var oldTemp: Array<CellModel> = [...yourShips];
      var newTemp: Array<CellModel> = [];
      oldTemp.forEach((c: CellModel) => {
        if (!(c.row === cell.row && c.column === cell.column)) newTemp.push(c);
      });
      setYourShips(newTemp);
    }
  };

  return (
    <div>
      <div className="instructionsDiv">
        <PlaceShipsInstruction />
      </div>
      <div className="buttonsDiv">
        {!eraseMode && (
          <button onClick={() => setEraseMode(true)}>Clear cell mode</button>
        )}
        {eraseMode && (
          <button onClick={() => setEraseMode(false)}>Place ships mode</button>
        )}
      </div>
      <div className="placeShipsBoardCell">
        <h2>Your Board</h2>
        <PlaceShipsBoardComponent
          shipsLocations={yourShips}
          onClickFunction={clickOnCell}
        />
      </div>
      <div className="bottomControls">
        <Link to="/">
          <button>Back to menu</button>
        </Link>
      </div>
    </div>
  );
}

export default GamePage;
