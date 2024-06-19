import api from '../config';
import { AxiosResponse } from 'axios';
import { LoginCredentials, AuthResponse } from '../types';

export const login = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/login', credentials);
};
