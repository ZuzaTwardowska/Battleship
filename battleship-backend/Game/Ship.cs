using System.Collections.Generic;

namespace battleship_backend
{    
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
}