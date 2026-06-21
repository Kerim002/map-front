import { API_URL, API_VERSION } from "../config/url";

const cleanParams = (
  params: Record<string, unknown>
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

class ApiError extends Error {
  public response: Response;
  public data: any; // Add this to hold the JSON body

  constructor(response: Response, data: any) {
    super("ApiError:" + response.status + "\n" + response.statusText);
    this.response = response;
    this.data = data; // Assign the parsed JSON
  }
}

export const apiInstance = async <T>(
  url: string,
  init?: RequestInit & {
    json?: unknown;
    params?: Record<string, any>;
    retry?: boolean;
  }
): Promise<T> => {

  const locale = typeof window !== "undefined"
    ? localStorage.getItem("i18nextLng") || "ru"
    : "ru";
  const token = localStorage.getItem("token")



  let headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": locale,
    "authorization":`Bearer ${token}`,
  
    ...(init?.headers as Record<string, string>),

  };

  if (init?.json) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(
      cleanParams(init.json as Record<string, unknown>)
    );
  }

  if (init?.params) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = cleanParams(init.params) as any;
    const searchParams = new URLSearchParams(params);
    url = `${url}${searchParams.toString() && "?" + searchParams.toString()}`;
  }



  const baseUrl = API_URL?.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const version = API_VERSION?.startsWith('/') ? API_VERSION : `/${API_VERSION}`;
  const path = url?.startsWith('/') ? url : `/${url}`;
  const fullUrl = `${baseUrl}${version}${path}`;

  const result = await fetch(fullUrl, {
    ...init,
    headers,
  });


  if (!result.ok) {
    const errorBody = await result.json().catch(() => ({}));
    if (result.status === 401) {
      window.location.href = "/login"
    }
    throw new ApiError(result, errorBody);

  }

  try {
    const data = (await result.json()) as T;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    if (result.status === 204 || result.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return "success" as any;
    }
  }

  return Promise.reject(new Error("Unexpected API response"));
};
