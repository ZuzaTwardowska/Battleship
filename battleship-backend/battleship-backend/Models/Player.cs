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
                            if (!Cell.isValid(row,col) || board[row, col] != CellState.Empty) continue;
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

        public bool wasDefeated(){
            for(int i = 0; i < 10; i++){
                for(int j = 0; j < 10; j++){
                    if(board[i,j] == CellState.Ship) return false;
                }
            }
            return true;
        }

        public bool registerShot(Cell shot)
        {
            bool res = false;
            if (board[shot.Row, shot.Column] == CellState.Ship) res = true;
            board[shot.Row, shot.Column] = CellState.Crushed;
            return res;
        }

        public Cell makeShot(Player opponent)
        {
            Cell shot = calculateNextShot();
            bool wasSuccessful = opponent.registerShot(shot);
            if (!wasSuccessful)
            {
                opponentsBoard[shot.Row, shot.Column] = CellState.Crushed;
            }
            else
            {
                opponentsBoard[shot.Row, shot.Column] = CellState.Ship;
                lastSuccessfulShot = shot;
            }
            return shot;
        }

        private Cell calculateNextShot()
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

        private Cell randomizeShot()
        {
            Cell shot = null;
            Random rand = new Random();
            while (shot == null)
            {
                int col = rand.Next(0, 10);
                int row = rand.Next(0, 10);
                if (opponentsBoard[row, col] == CellState.Empty) shot = new Cell(row, col);
            }
            return shot;
        }

        private (bool,bool) calculateLastShotShipDirection()
        {
            (int row, int col) = (lastSuccessfulShot.Row, lastSuccessfulShot.Column);
            if (Cell.isValid(row + 1, col) && opponentsBoard[row + 1, col] == CellState.Ship) return (true, true);
            if (Cell.isValid(row - 1, col) && opponentsBoard[row - 1, col] == CellState.Ship) return (true, true);
            if (Cell.isValid(row, col + 1) && opponentsBoard[row, col + 1] == CellState.Ship) return (true, false);
            if (Cell.isValid(row, col - 1) && opponentsBoard[row, col - 1] == CellState.Ship) return (true, false);
            return (false, false);
        }

        private Cell getNextGuessInDirection(int row, int col, int[] vector)
        {
            if (!Cell.isValid(row+vector[0], col+vector[1])) return null;
            if (opponentsBoard[row + vector[0], col + vector[1]] == CellState.Empty) return new Cell(row + vector[0], col + vector[1]);
            if (opponentsBoard[row + vector[0], col + vector[1]] == CellState.Crushed) return null;
            return getNextGuessInDirection(row + vector[0], col + vector[1], vector);
        }

        private void setShipOnBoard(List<Cell> shipPositions) => shipPositions.ForEach((Cell c) => board[c.Row, c.Column] = CellState.Ship);

        public List<Cell> getShipsPositions()
        {
            List<Cell> positions = new List<Cell>();
            foreach(Ship s in ships)
            {
                positions.AddRange(s.location);
            }
            return positions;
        }
    }

    public class Cell
    {
        public int Row { get; private set; }
        public int Column { get; private set; }

        public Cell(int row, int column)
        {
            Row = row;
            Column = column;
        }

        public static bool isValid(int row, int column){
            if(row < 0) return false;
            if(row >= Player.BOARD_SIZE) return false;
            if(column < 0) return false;
            if(column >= Player.BOARD_SIZE) return false;
            return true;
        }
    }

    public class Ship
    {
        public List<Cell> location { get; private set; }
        int size;

        public Ship(int size, List<Cell> location)
        {
            this.size = size;
            this.location = location;
        }

    }

    public enum CellState
    {
        Empty,
        Ship,
        Crushed
    }
}
