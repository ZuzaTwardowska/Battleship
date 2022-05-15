import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getLoadOpponentConfig } from "../ApiServices/configCreator";
import ErrorComponent from "../components/ErrorComponents";
import { PlaceShipsInstruction } from "../components/Instructions";
import { LoadingComponent } from "../components/LoadingComponent";
import PlaceShipsBoardComponent from "../components/PlaceShipsBoardComponent";
import { CellModel } from "../Models/CellModel";
import { LoadedOpponent } from "../Models/LoadedOpponents";
import { isValidCellToFormAShip, ShipModel } from "../Models/ShipModel";
import "../styles/SimulationAndGameStyle.css";

interface PlaceShipsPageProps {
  setShiplocation: (arr: Array<CellModel>) => void;
  setPlayersShips: React.Dispatch<React.SetStateAction<CellModel[]>>;
}

function PlaceShipsPage(props: PlaceShipsPageProps) {
  const service = APIservice();
  const [openErrorToast, setOpenErrorToast] = useState<boolean>(false);
  const [yourShips, setYourShips] = useState<Array<CellModel>>([]);
  const [placedShips, setPlacedShips] = useState<Array<ShipModel>>([]);
  const [toBePlacedShips, setToBePlacedShips] = useState<Array<number>>(
    getAllShipsToBePlaced()
  );
  const [currentShip, setCurrentShip] = useState<Array<CellModel>>([]);

  const loadOpponent = () => service.execute!(getLoadOpponentConfig(), "");

  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      props.setPlayersShips(
        (service.result! as unknown as LoadedOpponent).ships
      );
      props.setShiplocation(yourShips);
    }
    if (service.state === ServiceState.Error) {
      setOpenErrorToast(true);
    }
  }, [service.result, service.state]);

  function getAllShipsToBePlaced(): Array<number> {
    var res = [];
    for (var size = 5; size > 1; size--) {
      for (var quantity = 6 - size; quantity > 0; quantity--) res.push(size);
    }
    return res;
  }

  const clickOnCell = (e: any, cell: CellModel) => {
    e.preventDefault();
    putCell(cell);
  };

  const resetAllShips = () => {
    setCurrentShip([]);
    setToBePlacedShips(getAllShipsToBePlaced());
    setPlacedShips([]);
    setYourShips([]);
  };

  const putCell = (cell: CellModel) => {
    if (!isValidCellToFormAShip(cell, yourShips, currentShip)) return;
    if (toBePlacedShips.length === 0) return;
    setCurrentShip([...currentShip, cell]);
    setYourShips([...yourShips, cell]);
    if (currentShip.length + 1 === toBePlacedShips[0]) {
      setToBePlacedShips(toBePlacedShips.filter((_, id: number) => id !== 0));
      setPlacedShips([...placedShips, { locations: currentShip } as ShipModel]);
      setCurrentShip([]);
    }
  };

  const startGame = () => {
    loadOpponent();
  };

  return (
    <div>
      <div className="instructionsDiv">
        <PlaceShipsInstruction />
      </div>
      <div className="placeShipsPageWrapper">
        <div className="asideDiv">
          <div>
            <div className="nowPlacingDiv">
              <h5>Now placing:</h5>
              {toBePlacedShips.length > 0 && (
                <p>{toBePlacedShips[0]} segments</p>
              )}
            </div>
            <h5>To be placed:</h5>
            {toBePlacedShips.map((item: number) => (
              <p>{item} segments</p>
            ))}
            <button
              className="placeShipsButton"
              onClick={() => resetAllShips()}
            >
              Clear all cells
            </button>
          </div>
        </div>
        <div className="placeShipsBoardCell">
          <h2>Your Board</h2>
          <PlaceShipsBoardComponent
            shipsLocations={yourShips}
            onClickFunction={clickOnCell}
          />
        </div>
        <div className="asideDiv">
          <h5>Already placed:</h5>
          {placedShips.map((item: ShipModel) => (
            <p>{item.locations.length + 1} segments</p>
          ))}
          {toBePlacedShips.length === 0 && (
            <button onClick={startGame} className="placeShipsButton">
              Accept and Play
            </button>
          )}
        </div>
      </div>
      <div className="bottomControls">
        <Link to="/">
          <button>Back to menu</button>
        </Link>
      </div>
      {service.state === ServiceState.InProgress && <LoadingComponent />}
      {openErrorToast && <ErrorComponent closeToast={setOpenErrorToast} />}
    </div>
  );
}

export default PlaceShipsPage;
