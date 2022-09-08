import humps from "humps";
import qs from "qs";
import { API_BASE_URL, API_DOMAIN, API_MAJOR_VERSION } from "../constants";
import { isContainQueryString, isContainHttp } from "src/helper/url";
import { getLang } from "@/stores/config";

type paramConfig = {
  url: string;
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, unknown>;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  canRetry?: boolean;
  canCancel?: boolean;
  withCredentials?: boolean;
  lang?: string;
  clientType?: string;
};

type State = {
  data: unknown | null;
  httpStatus: number;
  error: {
    message: string;
    detail: unknown;
  };
};

async function useHttp(paramConfig: paramConfig): Promise<State> {
  const state: State = {
    data: null,
    httpStatus: 0,
    error: {
      message: "",
      detail: undefined as unknown,
    },
  };

  try {
    const DEFAULT_HEADERS = {
      "Content-Type": "application/json",
      "X-HH-Language": paramConfig.lang || getLang(),
    };
    const REQUIRED_PARAMS = {
      client_type: paramConfig.clientType || "web",
    };

    const options: RequestInit = {
      method: paramConfig.method || "GET",
      headers: DEFAULT_HEADERS,
    };

    if (paramConfig.data) {
      options.body = JSON.stringify(humps.decamelizeKeys(paramConfig.data));
    }

    const isURLContainQueryString = isContainQueryString(paramConfig.url)
      ? true
      : false;

    if (!isContainHttp(paramConfig.url)) {
      paramConfig.url = `${API_DOMAIN}/${API_BASE_URL}/${API_MAJOR_VERSION}/${paramConfig.url}`;
    }

    if (isURLContainQueryString) {
      let parsedParamsStringify = qs.stringify(REQUIRED_PARAMS);
      if (paramConfig.params) {
        parsedParamsStringify = qs.stringify(
          humps.decamelizeKeys({
            ...REQUIRED_PARAMS,
            ...paramConfig.params,
          })
        );
      }
      paramConfig.url = `${paramConfig.url}&${parsedParamsStringify}`;
    } else {
      let parsedParams = REQUIRED_PARAMS as Record<string, any>;
      if (paramConfig.params) {
        parsedParams = humps.decamelizeKeys({
          ...REQUIRED_PARAMS,
          ...paramConfig.params,
        });
      }
      const finalSearchParams = new URLSearchParams(parsedParams).toString();
      paramConfig.url = `${paramConfig.url}?${finalSearchParams}`;
    }

    const response = await fetch(paramConfig.url, options);
    const responseJson = await response.json();
    state.data = humps.camelizeKeys(responseJson);
    state.httpStatus = response.status;
  } catch (err) {
    state.error.detail = err;
    state.error.message = "Something went wrong when setup http call";
    // if (err instanceof HTTPError) {
    //   const { status } = err.response;
    //   const jsonVal = await err.response.json();
    //   state.httpStatus = status;
    //   state.error.message = jsonVal.message;
    //   state.error.detail = err;
    // } else {
    //   state.error.detail = err;
    //   state.error.message = "Something went wrong when setup http call";
    // }
  }
  return state;
}

export default useHttp;
