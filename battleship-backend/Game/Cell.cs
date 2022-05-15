
namespace battleship_backend
{
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
}