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
            List<Cell> player1Moves = new List<Cell>();
            List<Cell> player2Moves = new List<Cell>();
            while(!player1.wasDefeated() && !player2.wasDefeated()){
                player1Moves.Add(player1.makeShot(player2));
                if(player2.wasDefeated()) break;
                player2Moves.Add(player2.makeShot(player1));
            }
            return new Simulation(player1Moves, player2Moves, player1.getShipsPositions(), player2.getShipsPositions());
        }
    }
}
