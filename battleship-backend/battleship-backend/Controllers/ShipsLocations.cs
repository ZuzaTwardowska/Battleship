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
    public class ShipsLocationsController : ControllerBase
    {
        const int boardSize=10;
        private readonly ILogger<ShipsLocationsController> _logger;

        public ShipsLocationsController(ILogger<ShipsLocationsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ShipsLocations Get()
        {
            return new ShipsLocations((new Player()).getShipsPositions());
        }
    }
}
