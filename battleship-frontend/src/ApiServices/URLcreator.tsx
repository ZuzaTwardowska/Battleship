const apiUrl = "http://localhost:5000";

export const getSimulationURL = (): string => apiUrl + "/Simulation";

export const getOpponentsShipURL = (): string => apiUrl + "/ShipsLocations";

export const getNextMoveURL = (): string => apiUrl + "/CalculateMove";
