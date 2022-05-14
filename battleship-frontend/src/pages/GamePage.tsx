import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getLoadOpponentConfig, getSimulationConfig } from "../ApiServices/configCreator";
import BoardComponent, {
  BoardComponentRef,
} from "../components/BoardComponent";
import { CellModel } from "../Models/CellModel";
import { LoadedOpponent } from "../Models/LoadedOpponents";
import { SimulationModel } from "../Models/Simulation";
import "../styles/SimulationAndGameStyle.css";
import PlaceShipsPage from "./PlaceShipsPage";

function GamePage() {
  const service = APIservice();
  const [yourShips, setYourShips] = useState<Array<CellModel>>([]);
  const [playersShips, setPlayersShips] = useState<Array<CellModel>>([]);
  const board1 = useRef<BoardComponentRef>(null);
  const board2 = useRef<BoardComponentRef>(null);

  const loadOpponent = () => service.execute!(getLoadOpponentConfig(), "");

  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      setPlayersShips((service.result! as unknown as LoadedOpponent).ships);
    }
  }, [service.result, service.state]);

  const addUsersShips = (ships: Array<CellModel>) => {
    setYourShips(ships);
  };

  return (
    <div>
      {yourShips.length === 0 && (
        <PlaceShipsPage setShiplocation={addUsersShips} />
      )}
      {yourShips.length !== 0 && (
        <div>
          <div className="buttonsDiv">
            <button onClick={loadOpponent}>Load Opponent</button>
          </div>
          <div className="boardsWrapper">
            <div className="boardCell">
              <h2>Your Board</h2>
              <BoardComponent
                shipsLocations={yourShips}
                ref={board1}
                showShipLocations={true}
              />
            </div>
            <div className="boardCell">
              <h2>Opponents Board</h2>
              <BoardComponent
                shipsLocations={playersShips}
                ref={board2}
                showShipLocations={true}
              />
            </div>
          </div>
          <div className="bottomControls">
            <Link to="/">
              <button>Back to menu</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
