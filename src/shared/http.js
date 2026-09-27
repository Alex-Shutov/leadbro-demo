import axios from 'axios';
import { API_URL, USE_MOCKS } from './constants';
import Cookies from 'js-cookie';
import MockAdapter from 'axios-mock-adapter';
import { handleError } from '../utils/snackbar';
import * as Sentry from '@sentry/react';

export let http = axios.create({
  baseURL: API_URL || '',
});

export const adapter = http.defaults.adapter;

export const mockHttp = new MockAdapter(http, { delayResponse: 200 });

http.interceptors.request.use(
  async (request) => {
    if (request.url?.toLowerCase().includes('/auth')) {
      return request;
    }

    if (request.method === 'GET' || request.method === 'get') {
      request.headers['Cache-Control'] = 'no-cache';

      if (request.params) {
        const newParams = {};

        Object.entries(request.params).forEach(([key, value]) => {
          if (
            value === null ||
            value === undefined ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
          ) {
            return;
          }

          if (typeof value === 'string' && value.includes(',')) {
            const arrayValues = value.split(',').filter((v) => v.trim());
            if (arrayValues.length > 0) {
              newParams[`${key}[]`] = arrayValues;
            }
          } else {
            newParams[key] = value;
          }
        });

        request.params = newParams;
      }
    }

    if (!USE_MOCKS) {
      request.headers.Authorization = `Bearer ${await getToken()}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!USE_MOCKS && error.response?.status === 403) {
      const currentPath = window.location.pathname;
      window.location.href = `/forbidden?from=${encodeURIComponent(currentPath)}`;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const setToken = async (accessToken) => {
  Cookies.set('accessToken', accessToken, { expires: 365 });
};
export const getToken = async () => {
  return Cookies.get('accessToken') || '';
};
export const removeToken = async () => {
  Cookies.remove('accessToken');
};

export const handleHttpResponse = (response) => {
  return { status: 'success', body: response.data };
};

export const handleHttpError = (error) => {
  Sentry.captureException(error, {
    extra: {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
    },
  });
  const code = error?.code;
  console.warn({ status: 'error', message: error?.message, code });
  return { status: 'error', message: error?.message, code };
};

export const handleShowError = (errors, delay = 100) => {
  const errorsResp = errors.response?.data?.errors;
  const errorsResponse = errorsResp
    ? errorsResp
    : errors.response?.data?.message;
  let delayTime = 0;

  const getErrorMessages = () =>
    Object.entries(errorsResponse).flatMap(([field, messages]) => {
      return messages?.map((message) => `${field}: ${message}`);
    });
  const errorContext = {
    originalError: errors,
    response: {
      status: errors.response?.status,
      statusText: errors.response?.statusText,
      data: errors.response?.data,
    },
    request: {
      url: errors.config?.url,
      method: errors.config?.method,
      headers: errors.config?.headers,
    },
  };

  const messages = errorsResp ? getErrorMessages() : [errorsResponse];

  messages.forEach((message) => {
    Sentry.captureMessage(message ?? 'Произошла ошибка', {
      level: 'info',
      extra: errorContext,
      tags: {
        errorType: 'user_facing_error',
        source: 'handleShowError',
      },
    });

    setTimeout(() => {
      handleError(message ?? 'Произошла ошибка', errorContext);
    }, delayTime);

    delayTime += delay;
  });
  throw errorsResponse;
};

export const resetApiProvider = () => {
  if (USE_MOCKS) {
    setMockProvider();
  } else {
    setAdapter();
  }
};

export const setAdapter = () => {
  http.defaults.adapter = adapter;
};

export const setMockProvider = () => {
  http.defaults.adapter = mockHttp.adapter();
};

if (USE_MOCKS) {
  setMockProvider();
}

const handleSetToken = async (response) => {
  await setToken(response.data.accessToken);
};
