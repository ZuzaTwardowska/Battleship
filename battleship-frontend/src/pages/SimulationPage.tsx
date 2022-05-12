import BoardComponent from "../components/BoardComponent";
import "../styles/SimulationPageStyle.css";

function SimulationPage() {
    return (
      <div className="boardsWrapper">
        <div className="boardCell">
          <h2>Player 1</h2>
          <BoardComponent/>
        </div>
        <div className="boardCell">
          <h2>Player 2</h2>
          <BoardComponent/>
        </div>
      </div>
    );
  }

  export default SimulationPage;