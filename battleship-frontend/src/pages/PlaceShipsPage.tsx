import { useState } from "react";
import { Link } from "react-router-dom";
import { PlaceShipsInstruction } from "../components/Instructions";
import PlaceShipsBoardComponent from "../components/PlaceShipsBoardComponent";
import { CellModel } from "../Models/CellModel";
import { isValidCellToFormAShip, ShipModel } from "../Models/ShipModel";
import "../styles/SimulationAndGameStyle.css";

interface PlaceShipsPageProps{
    setShiplocation:(arr:Array<CellModel>)=>void;
}

function PlaceShipsPage(props:PlaceShipsPageProps) {
  const [yourShips, setYourShips] = useState<Array<CellModel>>([]);
  const [placedShips, setPlacedShips] = useState<Array<ShipModel>>([]);
  const [toBePlacedShips, setToBePlacedShips] = useState<Array<number>>(
    getAllShipsToBePlaced()
  );
  const [currentShip, setCurrentShip] = useState<Array<CellModel>>([]);

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
    setCurrentShip([...currentShip, cell]);
    setYourShips([...yourShips, cell]);
    if (currentShip.length + 1 === toBePlacedShips[0]) {
      setToBePlacedShips(
        toBePlacedShips.filter((val: number, id: number) => id !== 0)
      );
      setPlacedShips([...placedShips, { locations: currentShip } as ShipModel]);
      setCurrentShip([]);
    }
  };

  return (
    <div>
      <div className="instructionsDiv">
        <PlaceShipsInstruction />
      </div>
      <div className="placeShipsPageWrapper">
        <div>
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
        <div>
          <h5>Already placed:</h5>
          {placedShips.map((item: ShipModel) => (
            <p>{item.locations.length + 1} segments</p>
          ))}
          {toBePlacedShips.length === 0 && (
            <button onClick={()=>props.setShiplocation(yourShips)}className="placeShipsButton">Accept and Play</button>
          )}
        </div>
      </div>
      <div className="bottomControls">
        <Link to="/">
          <button>Back to menu</button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceShipsPage;
