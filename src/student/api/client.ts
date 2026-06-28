import type { ApiError } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1';

export class ApiClientError extends Error {
  constructor(
    public status: number,
    public apiError: ApiError,
  ) {
    super(apiError.message);
    this.name = 'ApiClientError';
  }
}

function getAuthToken(): string | null {
  try {
    const raw = sessionStorage.getItem('mozart_auth') ?? localStorage.getItem('mozart_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.tokens?.accessToken ?? null;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      code: 'UNKNOWN',
      message: response.statusText,
    }));
    throw new ApiClientError(response.status, error);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

/** Flag pour basculer mock ↔ API réelle */
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK !== 'false';
