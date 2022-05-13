import { useEffect, useRef, useState } from "react";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getSimulationConfig } from "../ApiServices/configCreator";
import BoardComponent, { BoardComponentRef } from "../components/BoardComponent";
import { SimulationModel } from "../Models/Simulation";
import "../styles/SimulationPageStyle.css";

function SimulationPage() {
  const service = APIservice();
  const [simulationData, setSimulationData] = useState<SimulationModel|undefined>(undefined)
  const board1 = useRef<BoardComponentRef>(null);
  const board2 = useRef<BoardComponentRef>(null);

  const loadSimulation=()=>service.execute!(getSimulationConfig(),"");

  const startSimulation=()=>{
    const timer = setTimeout(() => makeMoveOnBoard1(0), 3000);
    return () => clearTimeout(timer);
  }

  const makeMoveOnBoard1=(moveNumber:number)=>{
    if(simulationData === undefined) return;
    if(moveNumber >= simulationData!.player2Moves.length) return;
    board1.current?.markOpponentsMove(simulationData!.player2Moves[moveNumber]);
    const timer = setTimeout(() => makeMoveOnBoard2(moveNumber), 1000);
    return () => clearTimeout(timer);
  }

  const makeMoveOnBoard2=(moveNumber:number)=>{
    if(simulationData === undefined) return;
    if(moveNumber >= simulationData!.player1Moves.length) return;
    board2.current?.markOpponentsMove(simulationData!.player1Moves[moveNumber]);
    const timer = setTimeout(() => makeMoveOnBoard1(moveNumber+1), 1000);
    return () => clearTimeout(timer);
  }

  useEffect(()=>{
    if(service.state === ServiceState.Fetched){
      setSimulationData(service.result! as unknown as SimulationModel);
    }

  },[service.result, service.state])

    return (
      <div>
        <div className="buttonsDiv">
          <button onClick={loadSimulation}>Load Simulation</button>
          <button onClick={startSimulation} disabled={simulationData === undefined}>Run Simulation</button>
        </div>
      <div className="boardsWrapper">
        <div className="boardCell">
          <h2>Player 1</h2>
          <BoardComponent shipsLocations={simulationData?.player1Ships} ref={board1}/>
        </div>
        <div className="boardCell">
          <h2>Player 2</h2>
          <BoardComponent shipsLocations={simulationData?.player2Ships} ref={board2}/>
        </div>
      </div>
      </div>
    );
  }

  export default SimulationPage;