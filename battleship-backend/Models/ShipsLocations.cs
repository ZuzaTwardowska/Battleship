using System;
using System.Collections.Generic;

namespace battleship_backend
{
    public class ShipsLocations
    {
        public Cell[] Ships { get; set; }

        public ShipsLocations(List<Cell> shipLocations)
        {
            Ships = shipLocations.ToArray();
        }
    }
}
