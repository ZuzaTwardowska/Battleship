using System;
using System.Collections.Generic;

namespace battleship_backend
{
    public class Player
    {
        List<Ship> ships = new List<Ship>();
        CellState[,] board = new CellState[BOARD_SIZE, BOARD_SIZE];
        CellState[,] opponentsBoard = new CellState[BOARD_SIZE, BOARD_SIZE];
        Cell lastSuccessfulShot = null;
        public static int BOARD_SIZE = 10;
        public Player()
        {
            placeShipsOnBoard();
        }

        /// <summary>Randomly place ships on board.</summary>
        private void placeShipsOnBoard()
        {
            for(int size = 5; size > 1; size--)
            {
                for (int quantity = 6 - size; quantity > 0; quantity--)
                {
                    List<Cell> shipCellLocations = new List<Cell>();
                    bool shipWasSet = false;
                    while (!shipWasSet)
                    {
                        Random rand = new Random();
                        shipCellLocations.Clear();
                        int col = rand.Next(0, 10);
                        int row = rand.Next(0, 10);
                        bool isVertical = rand.Next(0, 100) < 50 ? true : false;

                        for(int i = 0; i < size; i++)
                        {
                            if (!Cell.isValid(row,col) || board[row, col] != CellState.Empty) break;
                            shipCellLocations.Add(new Cell(row, col));
                            if (isVertical) col++;
                            else row++;
                        }

                        if (shipCellLocations.Count == size) shipWasSet = true;
                    }
                    ships.Add(new Ship(size, shipCellLocations));
                    setShipOnBoard(shipCellLocations);
                }
            }
        }

        /// <summary>Check if player was defeated/all their ships were 
        /// destroyed.</summary>
        /// <returns>True if player was defeated.
        /// False otherwise.</returns>
        public bool wasDefeated(){
            for(int i = 0; i < 10; i++){
                for(int j = 0; j < 10; j++){
                    if(board[i,j] == CellState.Ship) return false;
                }
            }
            return true;
        }

        /// <summary>Change players board state after opponents shot.</summary>
        /// <param name="shot">Cell that was shot by the opponent.</param>
        /// <returns>True if shot was successful. False otherwise.</returns>
        public bool registerShot(Cell shot)
        {
            bool res = false;
            if (board[shot.Row, shot.Column] == CellState.Ship) res = true;
            board[shot.Row, shot.Column] = CellState.Crashed;
            return res;
        }

        /// <summary>Pick cell to be shot, register it on the opponentsBoard
        /// and inform opponent about the shot.</summary>
        /// <param name="opponent">Opponent that will have to register this shot</param>
        /// <returns>Cell that will be shot.</returns>
        public Cell makeShot(Player opponent)
        {
            Cell shot = calculateNextShot();
            bool wasSuccessful = opponent.registerShot(shot);
            if (!wasSuccessful)
            {
                opponentsBoard[shot.Row, shot.Column] = CellState.Crashed;
            }
            else
            {
                opponentsBoard[shot.Row, shot.Column] = CellState.Ship;
                lastSuccessfulShot = shot;
            }
            return shot;
        }


        /// <summary>Pick a cell to be shot.</summary>
        /// <returns>Cell that will be shot.</returns>
        public Cell calculateNextShot()
        {
            Random rand = new Random();
            Cell shot = null;
            if (lastSuccessfulShot != null)
            {
                (int row, int col) = (lastSuccessfulShot.Row, lastSuccessfulShot.Column);
                List<Cell> possibibleShots = new List<Cell>();
                (bool hasSetDirection, bool isVertical) = calculateLastShotShipDirection();
                if (!hasSetDirection)
                {
                    if (Cell.isValid(row + 1, col) && opponentsBoard[row + 1, col] == CellState.Empty) possibibleShots.Add(new Cell(row + 1, col));
                    if (Cell.isValid(row - 1, col) && opponentsBoard[row - 1, col] == CellState.Empty) possibibleShots.Add(new Cell(row - 1, col));
                    if (Cell.isValid(row, col + 1) && opponentsBoard[row, col + 1] == CellState.Empty) possibibleShots.Add(new Cell(row, col + 1));
                    if (Cell.isValid(row, col - 1) && opponentsBoard[row, col - 1] == CellState.Empty) possibibleShots.Add(new Cell(row, col - 1));
                }
                else
                {
                    if (isVertical)
                    {
                        Cell guess = getNextGuessInDirection(row, col, new int[] { 1, 0 });
                        if (guess != null) possibibleShots.Add(guess);
                        guess = getNextGuessInDirection(row, col,new int[] { -1, 0 });
                        if (guess != null) possibibleShots.Add(guess);
                    }
                    else
                    {
                        Cell guess = getNextGuessInDirection(row, col, new int[] { 0, 1 });
                        if (guess != null) possibibleShots.Add(guess);
                        guess = getNextGuessInDirection(row, col,new int[] { 0, -1 });
                        if (guess != null) possibibleShots.Add(guess);
                    }
                }

                if (possibibleShots.Count == 0) lastSuccessfulShot = null;
                else
                {
                    shot = possibibleShots[rand.Next(0, possibibleShots.Count)];
                }
            }
            if (shot == null) shot = randomizeShot();
            return shot;
        }

        /// <summary>Randomize a cell to be shot.</summary>
        /// <returns>Cell to be shot.</returns>
        private Cell randomizeShot()
        {
            Cell shot = null;
            Random rand = new Random();
            while (shot == null)
            {
                int col = rand.Next(0, 10);
                int row = rand.Next(0, 10);
                if (opponentsBoard[row, col] == CellState.Empty && !isSingleEmpty(row,col)) shot = new Cell(row, col);
            }
            return shot;
        }

        /// <summary>Check if cell is surrounded by crashed cells without a ship.</summary>
        /// <param name="row">Row number</param>
        /// <param name="column">Column number</param>
        /// <returns>True if cell is surrounded by crashed cells without a ship.
        /// False otherwise.</returns>
        private bool isSingleEmpty(int row, int col){
            if(Cell.isValid(row - 1,col) && opponentsBoard[row - 1, col] != CellState.Crashed) return false;
            if(Cell.isValid(row + 1,col) && opponentsBoard[row + 1, col] != CellState.Crashed) return false;
            if(Cell.isValid(row,col - 1) && opponentsBoard[row, col - 1] != CellState.Crashed) return false;
            if(Cell.isValid(row,col + 1) && opponentsBoard[row, col + 1] != CellState.Crashed) return false;
            return true;
        }

        /// <summary>Check if ship's direction can be determined from lastSuccessfulShot.</summary>
        /// <returns>(true,true) if the ship is vertical. (true, false) if the ship is horizontal.
        /// (false, false) if direction cannot be determined.</returns>
        private (bool, bool) calculateLastShotShipDirection()
        {
            (int row, int col) = (lastSuccessfulShot.Row, lastSuccessfulShot.Column);
            if (Cell.isValid(row + 1, col) && opponentsBoard[row + 1, col] == CellState.Ship) return (true, true);
            if (Cell.isValid(row - 1, col) && opponentsBoard[row - 1, col] == CellState.Ship) return (true, true);
            if (Cell.isValid(row, col + 1) && opponentsBoard[row, col + 1] == CellState.Ship) return (true, false);
            if (Cell.isValid(row, col - 1) && opponentsBoard[row, col - 1] == CellState.Ship) return (true, false);
            return (false, false);
        }

        /// <summary>Find cell to shot in ships direction, next valid cell surrounding last shot.</summary>
        /// <param name="row">Row number</param>
        /// <param name="column">Column number</param>
        /// <param name="vector">Int[2] vector to change row and/or column value.</param>
        /// <returns>Cell to shot in the ships direction.</returns>
        private Cell getNextGuessInDirection(int row, int col, int[] vector)
        {
            if (!Cell.isValid(row+vector[0], col+vector[1])) return null;
            if (opponentsBoard[row + vector[0], col + vector[1]] == CellState.Empty) return new Cell(row + vector[0], col + vector[1]);
            if (opponentsBoard[row + vector[0], col + vector[1]] == CellState.Crashed) return null;
            return getNextGuessInDirection(row + vector[0], col + vector[1], vector);
        }

        /// <summary>Add ship to board.</summary>
        /// <param name="shipPositions">List of cells creating a ship.</param>
        private void setShipOnBoard(List<Cell> shipPositions) => shipPositions.ForEach((Cell c) => board[c.Row, c.Column] = CellState.Ship);

        /// <summary>Return a list of ships' cells.</summary>
        /// <returns>List of cells containing all ships' segments.</returns>
        public List<Cell> getShipsPositions()
        {
            List<Cell> positions = new List<Cell>();
            foreach(Ship s in ships)
            {
                positions.AddRange(s.location);
            }
            return positions;
        }

        /// <summary>Load information about opponents board.</summary>
        /// <param name="missedShots">List of cells that were already shot
        /// and do not contain any ship segments.</param>
        /// <param name="successfulShots">List of cells that were already shot
        /// and contain ship segments.</param>
        public void setOpponentsBoard(Cell[] missedShots, Cell[] successfulShots){
            opponentsBoard = new CellState[BOARD_SIZE, BOARD_SIZE];
            foreach(Cell c in missedShots){
                opponentsBoard[c.Row,c.Column] = CellState.Crashed;
            }
            foreach(Cell c in successfulShots){
                opponentsBoard[c.Row,c.Column] = CellState.Ship;
            }
        }

        /// <summary>CLoad last successful shot made on opponents board.</summary>
        /// <param name="shot">Last successful shot.</param>
        public void setLastSuccessfulShot(Cell shot){
            lastSuccessfulShot=shot;
        }
    }
}
