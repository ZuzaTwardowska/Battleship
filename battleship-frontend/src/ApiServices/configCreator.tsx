import { ApiConfig } from "./APIutilities"
import { getSimulationURL } from "./URLcreator";

export const getSimulationConfig = (): ApiConfig =>
  ({ method: "get", header: "", url: getSimulationURL() } as ApiConfig);