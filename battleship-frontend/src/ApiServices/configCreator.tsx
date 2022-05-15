import { ApiConfig } from "./APIutilities";
import { getSimulationURL, getOpponentsShipURL, getNextMoveURL } from "./URLcreator";

export const getSimulationConfig = (): ApiConfig =>
  ({ method: "get", header: "", url: getSimulationURL() } as ApiConfig);

export const getLoadOpponentConfig = (): ApiConfig =>
  ({ method: "get", header: "", url: getOpponentsShipURL() } as ApiConfig);

  export const getNextMoveConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getNextMoveURL() } as ApiConfig);
