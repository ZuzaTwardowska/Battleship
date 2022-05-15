using Microsoft.VisualStudio.TestTools.UnitTesting;
using battleship_backend;
using System.Collections.Generic;
using System;

namespace BattleshipTests
{
    [TestClass]
    public class BattleshipTests
    {
        [TestMethod]
        public void CheckIfAllShipsWerePutOnBoard()
        {
            Player p = new Player();
            int output = p.getShipsPositions().Count;
            Assert.AreEqual(output, 30);
        }

        [TestMethod]
        public void CheckIfPlayerIsInitializedNotDefeated()
        {
            Player p = new Player();
            bool output = p.wasDefeated();
            Assert.AreEqual(output, false);
        }

        [TestMethod]
        public void RegisterShotReturnsTrueWhenSuccessful()
        {
            Player p = new Player();
            List<Cell> shipsLocations = p.getShipsPositions();
            Random rand = new Random();
            bool output = p.registerShot(shipsLocations[rand.Next(0,shipsLocations.Count)]);
            Assert.AreEqual(output, true);
        }
        [TestMethod]
        public void RegisterShotReturnsFalseWhenMissed()
        {
            Player p = new Player();
            List<Cell> shipsLocations = p.getShipsPositions();
            Cell shot = new Cell(0, 0);
            Random rand = new Random();
            while(shipsLocations.Exists((Cell c)=>c.Row==shot.Row && c.Column == shot.Column))
            {
                shot = new Cell(rand.Next(0, Player.BOARD_SIZE), rand.Next(0, Player.BOARD_SIZE));
            }
            bool output = p.registerShot(shot);
            Assert.AreEqual(output, false);
        }

        [TestMethod]
        public void MakeShotReturnsValidCell()
        {
            Player p = new Player();
            Cell shot = p.makeShot(new Player());
            bool output = Cell.isValid(shot.Row, shot.Column);
            Assert.AreEqual(output, true);
        }

        [TestMethod]
        [DataRow(new int[]{1, 2}, true)]
        [DataRow(new int[]{1, -2}, false)]
        [DataRow(new int[]{-1, 2}, false)]
        [DataRow(new int[]{0,0}, true)]
        public void CheckIfCellValidationWorks(int[] input, bool expectedOutput)
        {
            bool output = Cell.isValid(input[0], input[1]);
            Assert.AreEqual(expectedOutput, output);
        }

    }
}
