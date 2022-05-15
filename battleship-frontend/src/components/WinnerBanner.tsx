import { Link } from "react-router-dom";

interface WinnerBannerProps {
  winner: string;
  buttonText: string;
  onClickFunction: () => void;
}

const WinnerBanner = (props: WinnerBannerProps) => {
  return (
    <div className="winnerBannerWrapper">
    <div className="shadowCover"></div>
      <div className="winnerDiv">
        <h1>{props.winner} won</h1>
        <button onClick={props.onClickFunction}>{props.buttonText}</button>
        <Link to="/">
          <button>Back to menu</button>
        </Link>
      </div>
    </div>
  );
};

export default WinnerBanner;
