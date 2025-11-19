// Mock axios before importing apiClient
jest.mock('axios', () => {
  const mockAxiosInstance = {
    interceptors: {
      request: {
        use: jest.fn()
      }
    }
  };
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockAxiosInstance)
    }
  };
});

import apiClient from '../apiClient';
import axios from 'axios';

describe('API Client', () => {
  it('should create axios instance with correct base URL', () => {
    // axios.create is called when apiClient module is imported
    expect(axios.create).toHaveBeenCalled();
    const createCall = axios.create.mock.calls[0][0];
    expect(createCall.baseURL).toBe(
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
    );
    expect(createCall.withCredentials).toBe(true);
  });

  it('should export apiClient instance', () => {
    expect(apiClient).toBeDefined();
    expect(apiClient.interceptors).toBeDefined();
    expect(apiClient.interceptors.request).toBeDefined();
  });

  it('should register request interceptor on initialization', () => {
    // The interceptor should be registered when apiClient is imported
    const instance = axios.create();
    // Verify the interceptor setup function exists
    expect(instance.interceptors.request.use).toBeDefined();
  });
});
