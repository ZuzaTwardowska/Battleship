import { Link } from "react-router-dom";
import "../styles/MainPageStyles.css";

function MainPage() {
  const style = {
    display: 'block'
  };

  return (
    <div className="menuWrapper">
      <Link to="/simulation" style={style}>
        <button>Simulation mode</button>
      </Link>
      <Link to="/game" style={style}>
        <button>Game mode</button>
      </Link>
    </div>
  );
}

export default MainPage;
