import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

let token: string | null = localStorage.getItem('token');
let refreshToken: string | null = localStorage.getItem('refreshToken');

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const setApiClientTokens = (newToken: string, newRefreshToken: string) => {
  token = newToken;
  refreshToken = newRefreshToken;

  if (token) localStorage.setItem('token', token);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

export const resetApiClientTokens = () => {
  token = null;
  refreshToken = null;

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Request interceptor to add the token to headers
apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// For response interceptor (Refresh token on 401) we use a library
const refreshAuthLogic = (failedRequest: any) => {
  if (!refreshToken) {
    return Promise.reject();
  }

  return axios
    .post(`${import.meta.env.VITE_API_URL}/api/auth/token/refresh`, { refreshToken })
    .then((tokenRefreshResponse) => {
      const { token: newToken, refreshToken: newRefreshToken } = tokenRefreshResponse.data;
      setApiClientTokens(newToken, newRefreshToken);

      failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
      return Promise.resolve();
    });
};

createAuthRefreshInterceptor(apiClient, refreshAuthLogic);
