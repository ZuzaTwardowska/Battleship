import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getSimulationConfig } from "../ApiServices/configCreator";
import BoardComponent, {
  BoardComponentRef,
} from "../components/BoardComponent";
import ErrorComponent from "../components/ErrorComponents";
import { LoadingComponent } from "../components/LoadingComponent";
import WinnerBanner from "../components/WinnerBanner";
import { SimulationModel } from "../Models/Simulation";
import "../styles/SimulationAndGameStyle.css";

function SimulationPage() {
  const service = APIservice();
  const [openErrorToast, setOpenErrorToast] = useState<boolean>(false);
  const [simulationData, setSimulationData] = useState<
    SimulationModel | undefined
  >(undefined);
  const [winner, setWinner] = useState("");
  const board1 = useRef<BoardComponentRef>(null);
  const board2 = useRef<BoardComponentRef>(null);
  var timer:NodeJS.Timeout;

  const runAgain = () => {
    setSimulationData(undefined);
    setWinner("");
    board1.current?.clearBoard();
    board2.current?.clearBoard();
  };

  const loadSimulation = () => {
    if(timer!==undefined) clearTimeout(timer);
    service.execute!(getSimulationConfig(), "");
  }

  const startSimulation = () => {
    timer = setTimeout(() => makeMoveOnBoard2(0), 1000);
    return () => clearTimeout(timer);
  };

  const makeMoveOnBoard1 = (moveNumber: number) => {
    if (simulationData === undefined) return;
    if (moveNumber >= simulationData!.player2Moves.length) return;
    if (
      board1.current?.markOpponentsMove(
        simulationData!.player2Moves[moveNumber]
      )
    ) {
      timer = setTimeout(() => setWinner("Player2"), 600);
      return () => clearTimeout(timer);
    }
    timer = setTimeout(() => makeMoveOnBoard2(moveNumber + 1), 600);
    return () => clearTimeout(timer);
  };

  const makeMoveOnBoard2 = (moveNumber: number) => {
    if (simulationData === undefined) return;
    if (moveNumber >= simulationData!.player1Moves.length) return;
    if (
      board2.current?.markOpponentsMove(
        simulationData!.player1Moves[moveNumber]
      )
    ) {
      timer = setTimeout(() => setWinner("Player1"), 600);
      return () => clearTimeout(timer);
    }
    timer = setTimeout(() => makeMoveOnBoard1(moveNumber), 600);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (service.state === ServiceState.Fetched) {
      setSimulationData(service.result! as unknown as SimulationModel);
    }
    if (service.state === ServiceState.Error) {
      setOpenErrorToast(true);
    }
  }, [service.result, service.state]);

  return (
    <div>
      <div className="buttonsDiv">
        <button onClick={loadSimulation}>Load Simulation</button>
        <button
          onClick={startSimulation}
          disabled={simulationData === undefined}
        >
          Run Simulation
        </button>
      </div>
      <div className="boardsWrapper">
        <div className="boardCell">
          <h2>Player 1</h2>
          <BoardComponent
            shipsLocations={simulationData?.player1Ships}
            ref={board1}
            showShipLocations={true}
          />
        </div>
        <div className="boardCell">
          <h2>Player 2</h2>
          <BoardComponent
            shipsLocations={simulationData?.player2Ships}
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
      {winner.length > 0 && (
        <WinnerBanner
          winner={winner}
          buttonText={"Run Again"}
          onClickFunction={runAgain}
        />
      )}
      {service.state === ServiceState.InProgress && <LoadingComponent />}
      {openErrorToast && <ErrorComponent closeToast={setOpenErrorToast} />}
    </div>
  );
}

export default SimulationPage;
