using System;
using System.Collections.Generic;

namespace battleship_backend
{
    public class Simulation
    {
        public Cell[] Player1Moves { get; set; }
        public Cell[] Player2Moves { get; set; }
        public Cell[] Player1Ships { get;set;}
        public Cell[] Player2Ships { get;set;}

        public Simulation(List<Cell> player1Moves, List<Cell> player2Moves, List<Cell> player1Ships, List<Cell> player2Ships)
        {
            Player1Moves=player1Moves.ToArray();
            Player1Ships=player1Ships.ToArray();
            Player2Moves=player2Moves.ToArray();
            Player2Ships=player2Ships.ToArray();
        }
    }
}
