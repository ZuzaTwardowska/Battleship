using Microsoft.AspNetCore.Mvc;

namespace battleship_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShipsLocationsController : ControllerBase
    {
        const int boardSize=10;

        /// <summary>
        /// GET Get ships locations for the game
        /// </summary>
        /// <returns>Returns shipLocations</returns>
        [HttpGet]
        public ShipsLocations Get()
        {
            return new ShipsLocations((new Player()).getShipsPositions());
        }
    }
}
