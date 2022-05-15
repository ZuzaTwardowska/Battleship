const apiUrl = "https://localhost:5001";

export const getSimulationURL = (): string => apiUrl + "/Simulation";

export const getOpponentsShipURL = (): string => apiUrl + "/ShipsLocations";

export const getNextMoveURL = (): string => apiUrl + "/CalculateMove";
