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

  constructor(response: Response) {
    super("ApiError:" + response.status + "\n" + response.statusText);
    this.response = response;
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
  let headers: Record<string, string> = {
    Accept: "application/json",
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

  //   const locale = Cookie.get("i18next") || "en";

  //   const token = getCookie("access_token");

  //   if (token) {
  //     headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Accept-Language": locale,
  //       ...headers,
  //     };
  //   }

  const baseUrl = API_URL?.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const version = API_VERSION?.startsWith('/') ? API_VERSION : `/${API_VERSION}`;
  const path = url?.startsWith('/') ? url : `/${url}`;
  const fullUrl = `${baseUrl}${version}${path}`;

  const result = await fetch(fullUrl, {
    ...init,
    headers,
  });

  //   if (result.status === 401 && init?.retry !== false) {
  //     const refreshed = await refreshAccessToken();
  //     if (refreshed) {
  //       return jsonApiInstance<T>(url, { ...init, retry: false });
  //     } else {
  //       // Already redirected inside refreshAccessToken
  //       return Promise.reject(new ApiError(result));
  //     }
  //   }

  if (!result.ok) {
    throw new ApiError(result);
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
