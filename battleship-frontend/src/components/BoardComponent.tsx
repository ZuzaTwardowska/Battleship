import React from "react";
import BoardCell from "./BoardCell";
import "../styles/BoardStyle.css"

export enum State {
  Empty,
  Ship,
  Crashed,
}
class BoardComponent extends React.Component<{}, { cells: any }> {
  constructor(props: any) {
    super(props);
    this.state = { cells: this.createEmptyBoard() };
    this.setState({});
  }

  createEmptyBoard(): Array<Array<State>> {
    var temp: Array<Array<State>> = [];
    for (var i = 0; i < 10; i++) {
      var row: Array<State> = [];
      for (var j = 0; j < 10; j++) {
        row = [...row, State.Empty];
      }
      temp = [...temp, row];
    }
    return temp;
  }

  render() {
    return (
      <div className="board">
        {this.state.cells.map((row: Array<State>, rowIndex: number) => (
          <div className="boardRow" key={rowIndex}>
            {row.map((cell: State, colIndex) => (
              <BoardCell key={rowIndex + "" + colIndex} state={cell}/>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default BoardComponent;
