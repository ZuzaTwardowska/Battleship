using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace battleship_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculateMoveController : ControllerBase
    {
        const int boardSize=10;

        /// <summary>
        /// POST Post current game information, to get next move.
        /// </summary>
        /// <param name="calculateMoveQuery">current game information: missedShots: Cell[],
        /// successfulShots: Cell[], lastSuccessfulShot: Cell</param>
        /// <returns>Returns Cell as next move</returns>
        [HttpPost]
        public Cell GetMove([FromBody] CalculateMoveQuery calculateMoveQuery)
        {
            Player p = new Player();
            p.setOpponentsBoard(calculateMoveQuery.missedShots,calculateMoveQuery.successfulShots);
            p.setLastSuccessfulShot(calculateMoveQuery.lastSuccessfulShot);
            return p.calculateNextShot();
        }
    }
}
