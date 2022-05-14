import { CellModel } from "./CellModel";

export interface SimulationModel{
    player1Moves:Array<CellModel>;
    player2Moves:Array<CellModel>;
    player1Ships:Array<CellModel>;
    player2Ships:Array<CellModel>;
}
