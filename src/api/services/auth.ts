import api from '../config';
import { AxiosResponse } from 'axios';
import { LoginCredentials, TutorRegister, CandidateRegister ,OrganizationRegister, AuthResponse } from '../types';

export const loginService = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/authenticate', credentials);
};

export const registerCandidate = (candidate: CandidateRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register', candidate);
};

export const registerTutor = (educator: TutorRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register', educator);
};

export const registerOrganization = (organization: OrganizationRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register', organization);
};




// export const registerStudent 
