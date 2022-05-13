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
    public class SimulationController : ControllerBase
    {
        const int boardSize=10;
        private readonly ILogger<SimulationController> _logger;

        public SimulationController(ILogger<SimulationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Simulation Get()
        {
            Player player1 = new Player();
            Player player2 = new Player();
            return new Simulation(new List<Cell>(), new List<Cell>(), player1.getShipsPositions(), player2.getShipsPositions());
        }
    }
}
