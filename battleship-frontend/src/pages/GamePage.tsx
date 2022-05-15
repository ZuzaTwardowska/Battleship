import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getNextMoveConfig } from "../ApiServices/configCreator";
import BoardComponent, {
  BoardComponentRef,
} from "../components/BoardComponent";
import WinnerBanner from "../components/WinnerBanner";
import { CalculateMoveQuery } from "../Models/CalculateMoveQuery";
import { CellModel } from "../Models/CellModel";
import "../styles/SimulationAndGameStyle.css";
import PlaceShipsPage from "./PlaceShipsPage";

function GamePage() {
  const service = APIservice();
  const [yourShips, setYourShips] = useState<Array<CellModel>>([]);
  const [playersShips, setPlayersShips] = useState<Array<CellModel>>([]);
  const [isYourMove, setIsYourMove] = useState<boolean>(true);
  const [winner, setWinner] = useState("");
  const board1 = useRef<BoardComponentRef>(null);
  const board2 = useRef<BoardComponentRef>(null);

  const playAgain = () => {
    setYourShips([]);
    setPlayersShips([]);
    setWinner("");
    setIsYourMove(true);
    board1.current?.clearBoard();
    board2.current?.clearBoard();
  };

  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      board1.current?.markOpponentsMove(
        service.result! as unknown as CellModel
      );
      setIsYourMove(true);
    }
  }, [service.result, service.state]);

  const addUsersShips = (ships: Array<CellModel>) => {
    setYourShips(ships);
  };

  useEffect(() => {
    if (board1.current?.successfulShots.length === yourShips.length) {
      setWinner("Player1");
      return;
    }
    if (board2.current?.successfulShots.length === playersShips.length) {
      setWinner("You");
      return;
    }
    if (isYourMove === false) {
      service.execute!(getNextMoveConfig(), {
        missedShots: board1.current?.missedShots,
        successfulShots: board1.current?.successfulShots,
        lastSuccessfulShot: board1.current?.lastSuccessfulShot,
      } as CalculateMoveQuery);
    }
  }, [isYourMove]);

  return (
    <div>
      {yourShips.length === 0 && (
        <PlaceShipsPage
          setShiplocation={addUsersShips}
          setPlayersShips={setPlayersShips}
        />
      )}
      {yourShips.length !== 0 && (
        <div>
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
                showShipLocations={false}
                canMakeMove={isYourMove && winner.length === 0}
                setCanMakeMove={setIsYourMove}
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
      {winner.length > 0 && (
        <WinnerBanner winner={winner} onClickFunction={playAgain} buttonText={"Play Again"}/>
      )}
    </div>
  );
}

export default GamePage;
