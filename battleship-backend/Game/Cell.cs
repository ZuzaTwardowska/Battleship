
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

        /// <summary>Check if row and column are inside the board.</summary>
        /// <param name="row">Row number</param>
        /// <param name="column">Column number</param>
        /// <returns>True if row and column are inside the board.
        /// False otherwise.</returns>
        public static bool isValid(int row, int column){
            if(row < 0) return false;
            if(row >= Player.BOARD_SIZE) return false;
            if(column < 0) return false;
            if(column >= Player.BOARD_SIZE) return false;
            return true;
        }
    }
}