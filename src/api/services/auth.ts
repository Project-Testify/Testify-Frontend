import api from '../config';
import { AxiosResponse } from 'axios';
import { LoginCredentials, ExamsetterRegister, AttendeeRegister ,OrganizationRegister, AuthResponse } from '../types';

export const loginService = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/authenticate', credentials);
};

export const registerAttendee = (student: AttendeeRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register', student);
};

export const registerExamsetter = (educator: ExamsetterRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register', educator);
};

export const registerOrganization = (organization: OrganizationRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register', organization);
};




// export const registerStudent 
