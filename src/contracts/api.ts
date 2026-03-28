export interface ApiClient {
  get<T>(url: string, options?: RequestOptions): Promise<T>;
  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>;
  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>;
  delete<T>(url: string, options?: RequestOptions): Promise<T>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  signal?: AbortSignal;
}
