import { CellModel } from "./CellModel";

export interface ShipModel {
  locations: Array<CellModel>;
}

export function isValidCellToFormAShip(
  cell: CellModel,
  yourShips: Array<CellModel>,
  currentShip: Array<CellModel>
): boolean {
  if (
    yourShips.filter(
      (c: CellModel) => c.row === cell.row && c.column === cell.column
    ).length !== 0
  )
    return false;
  if (currentShip.length === 0) return true;
  if (currentShip.length === 1) {
    if (
      currentShip[0].row === cell.row &&
      Math.abs(currentShip[0].column - cell.column) < 2
    )
      return true;
    if (
      currentShip[0].column === cell.column &&
      Math.abs(currentShip[0].row - cell.row) < 2
    )
      return true;
  }
  if (currentShip.length > 1) {
    var isVertical = true;
    if (
      currentShip[currentShip.length - 1].row ===
      currentShip[currentShip.length - 2].row
    ) {
      isVertical = false;
    }
    if (isVertical) {
      for (var i = 0; i < currentShip.length; i++) {
        if (
          currentShip[i].column === cell.column &&
          Math.abs(currentShip[i].row - cell.row) < 2
        )
          return true;
      }
    } else {
      for (var i = 0; i < currentShip.length; i++) {
        if (
          currentShip[i].row === cell.row &&
          Math.abs(currentShip[i].column - cell.column) < 2
        )
          return true;
      }
    }
  }
  return false;
}
