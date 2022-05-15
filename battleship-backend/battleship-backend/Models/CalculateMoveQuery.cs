using System;
using System.Collections.Generic;

namespace battleship_backend
{
    public class CalculateMoveQuery
    {
        public Cell[] missedShots { get; set; }
        public Cell[] successfulShots { get; set; }
        public Cell lastSuccessfulShot { get; set; }
    }
}
