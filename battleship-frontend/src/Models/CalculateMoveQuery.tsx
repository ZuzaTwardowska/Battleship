import { CellModel } from "./CellModel";

export interface CalculateMoveQuery{
    missedShots: CellModel[];
    successfulShots: CellModel[];
    lastSuccessfulShot:CellModel;
}