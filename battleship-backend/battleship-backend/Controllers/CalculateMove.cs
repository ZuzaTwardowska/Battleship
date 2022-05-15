using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace battleship_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculateMoveController : ControllerBase
    {
        const int boardSize=10;
        private readonly ILogger<CalculateMoveController> _logger;

        public CalculateMoveController(ILogger<CalculateMoveController> logger)
        {
            _logger = logger;
        }

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
