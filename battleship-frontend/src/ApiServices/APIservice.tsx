import axios from "axios";
import { useState } from "react";
import { ApiConfig, ApiResult, ServiceState } from "./APIutilities";

export const APIservice = (): ApiResult<JSON | undefined> => {
  const [result, setResult] = useState<JSON | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [state, setState] = useState<ServiceState>(ServiceState.NoRequest);

  const execute = (
    config: ApiConfig,
    body: JSON,
    parseFunction: Function = (a: JSON) => a
  ) => {
    setState(ServiceState.InProgress);

    axios({
      url: config.url,
      data: body,
      method: config.method,
      headers: config.header,
    })
      .then((res:any) => {
        setResult(parseFunction(res.data));
        setState(ServiceState.Fetched);
      })
      .catch((e: any) => {
        setError({ name: e.name, message: e.response.data } as Error);
        setState(ServiceState.Error);
      });
  };

  return { result, error, state, execute };
};
