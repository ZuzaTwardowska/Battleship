import { Link } from "react-router-dom";
import "../styles/MainPageStyles.css";

function MainPage() {
  return (
    <div className="menuWrapper">
      <Link to="/simulation">
        <button>Start simulation</button>
      </Link>
    </div>
  );
}

export default MainPage;
