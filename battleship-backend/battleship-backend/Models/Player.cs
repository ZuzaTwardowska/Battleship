using System;
using System.Collections.Generic;

namespace battleship_backend
{
    public class Player
    {
        public List<Ship> ships = new List<Ship>();
        CellState[,] board = new CellState[10, 10];

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
                            if (row < 0 || row > 9 || col < 0 || col > 9 || board[row, col] != CellState.Empty) continue;
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
