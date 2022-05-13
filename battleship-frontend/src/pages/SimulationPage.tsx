import { useEffect, useState } from "react";
import { APIservice } from "../ApiServices/APIservice";
import { ServiceState } from "../ApiServices/APIutilities";
import { getSimulationConfig } from "../ApiServices/configCreator";
import BoardComponent from "../components/BoardComponent";
import { SimulationModel } from "../Models/Simulation";
import "../styles/SimulationPageStyle.css";

function SimulationPage() {
  const service = APIservice();
  const [simulationData, setSimulationData] = useState<SimulationModel|undefined>(undefined)

  const loadSimulation=()=>service.execute!(getSimulationConfig(),"");

  useEffect(()=>{
    if(service.state === ServiceState.Fetched){
      setSimulationData(service.result! as unknown as SimulationModel);
    }

  },[service.result, service.state])

    return (
      <div>
        <div className="buttonsDiv">
          <button onClick={loadSimulation}>Load Simulation</button>
          <button>Run Simulation</button>
        </div>
      <div className="boardsWrapper">
        <div className="boardCell">
          <h2>Player 1</h2>
          <BoardComponent shipsLocations={simulationData?.player1Ships}/>
        </div>
        <div className="boardCell">
          <h2>Player 2</h2>
          <BoardComponent shipsLocations={simulationData?.player2Ships}/>
        </div>
      </div>
      </div>
    );
  }

  export default SimulationPage;