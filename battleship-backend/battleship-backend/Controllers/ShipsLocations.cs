using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace battleship_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShipsLocationsController : ControllerBase
    {
        const int boardSize=10;

        [HttpGet]
        public ShipsLocations Get()
        {
            return new ShipsLocations((new Player()).getShipsPositions());
        }
    }
}
