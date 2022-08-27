import useHttp from "@/composable/useHttp";
import { isEmpty } from "lodash-es";
import type { City } from "@/types/City";

export interface GetCityResponse {
  data: City[];
  success: boolean;
  message: null;
}

export async function getCity(): Promise<{
  isSuccess: boolean;
  message: string;
  data: GetCityResponse["data"] | null;
}> {
  const defaultErrorMessage =
    "Oops, something went wrong, failed get city list";
  try {
    const result = await useHttp({
      method: "GET",
      url: "/cities.json",
    });
    const response = result.data as GetCityResponse;
    if (isEmpty(response)) {
      return {
        isSuccess: false,
        message: "city array is empty",
        data: null,
      };
    }

    if (!response.success) {
      return {
        isSuccess: false,
        message: response.message || defaultErrorMessage,
        data: null,
      };
    }

    return {
      isSuccess: true,
      message: response.message || "",
      data: response.data,
    };
  } catch (err: any) {
    return {
      isSuccess: false,
      message: defaultErrorMessage,
      data: null,
    };
  }
}
