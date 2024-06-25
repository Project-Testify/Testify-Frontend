import api from '../config';
import { AxiosResponse } from 'axios';
import { LoginCredentials, StudentRegister, EducatorRegister,OrganizationRegister, AuthResponse } from '../types';

export const loginService = (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/authenticate', credentials);
};

export const registerStudent = (student: StudentRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register/student', student);
};

export const registerEducator = (educator: EducatorRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register/educator', educator);
};

export const registerOrganization = (organization: OrganizationRegister): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/auth/register/organization', organization);
};




// export const registerStudent 
